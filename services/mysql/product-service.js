const getDatabase = require('../../database/connection-mysql').getDatabase;
const getModels = require('../../database/connection-mysql').getModels;


// works with transaction 
const createProduct = async (newProduct) => {

  // take the current date/time and sets timestamp
  newProduct.timestamp = new Date().toISOString();

  console.log("createProduct", newProduct);
  try {
    const result = await getDatabase().transaction(async (t) => {
      const product = await getModels().products.create(newProduct, { transaction: t });
      if (!product) throw new Error("Error finding product");
      return product;
    })

    return { product: result };

  } catch (error) {
    return { error: error.message };
  }
}


// works - get one specific by id
const getOneProduct = async (productId) => {
  console.log("getOneProduct", productId);
  try {

    const product = await getModels().products.findOne({ where: { product_id: productId } });
    if (!product) throw new Error("Error finding product");
    console.log("product", product);
    return product;

  } catch (error) {
    return { error: error.message };
  }
}

// Switch to determine the sort order
const getSortOrder = {
  "1": "ASC",
  asc: "ASC",
  ascending: "ASC",
  "-1": "DESC",
  desc: "DESC",
  descending: "DESC",
}

// works - gets all products (could have a search function also)
const getAllProducts = async (sortBy, sortOrder) => {
  console.log("getAllProducts");
  try {
    let products;

    if(sortBy){
      // Checks if the model contains the field to sort by
      let productHasSortField = getModels().products.rawAttributes.hasOwnProperty(sortBy) ? true : false;

      if(!productHasSortField) throw new Error(`Error: product does not contain field '${sortBy}'`);

      // if the sortOrder from the request is valid then the value will be used
      // If not valid then the sortOrder will default to ascending order

      if (sortOrder) sortOrder.toLowerCase();
      const order = getSortOrder[sortOrder] !== undefined ? getSortOrder[sortOrder] : getSortOrder["ascending"];

      // Finds the product sorted by the column and in the order specified in the request
      //product = await Product.find({}).sort({[sortBy]: order}); 
      products = await getModels().products.findAll({order: [[sortBy, order]] }); 
  }else{
      products = await getModels().products.findAll();
  }

  if (!products) throw new Error("Error finding products");
    return products;

  } catch (error) {
    return { error: error.message };
  }
}


// works
const updateProduct = async (productToUpdate) => {
  console.log("updateProduct", productToUpdate);

  try {

    // take the current date/time and sets timestamp
    productToUpdate.timestamp = new Date().toISOString();

    const result = await getDatabase().transaction(async (t) => {

      const updatedProduct = await getModels().products.update(productToUpdate,
        { where: { product_id: productToUpdate.product_id } },
        { transaction: t });

      // if it can't update product throws error
      if (!updatedProduct) throw new Error("Error updating product");

      // finds updated product and returns it
      const product = await getModels().products.findOne({ where: { product_id: productToUpdate.product_id } });
      return product;

    })

    return { product: result };

  } catch (error) {
    return { error: error.message };
  }


}


// ugly but works. error handling if no product sucks :( 
const deleteProduct = async (productId) => {
  console.log('deleteProduct', productId);

  try {
    const result = await getDatabase().transaction(async (t) => {

      const deletedProduct = await getModels().products.destroy({ where: { product_id: productId } }, { transaction: t })
      console.log("deletedProduct", deletedProduct);
      if (deletedProduct) {
        return deletedProduct;
      }

    })
    console.log("result", result);
    if (result) {
      return { response: "product has been deleted" };
    }

  } catch (error) {

    if (error.parent.code === "ER_ROW_IS_REFERENCED_2") {
      try {
        const result = await getDatabase().transaction(async (t) => {

          let archived = {
            is_archived: true
          }
          const archivedProduct = await getModels().products.update(archived, { where: { product_id: productId } }, { transaction: t });
          if (!archivedProduct) throw new Error("Error updating and archiving product");

          const product = await getModels().products.findOne({ where: { product_id: productId } });

          return product;
        })

        return { product: `This product has been archived: - name: ${result.name} - size: ${result.size} - price: ${result.price}` };

      } catch (error) {
        return { error: error.message };
      }
    }

    return { error: error.message };

  }

};

module.exports = {
  createProduct,
  getOneProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
}