const sequelize = require('../database/connect').database;
const model = require('../database/connect').models;


// works with transaction 
const createProduct = async (newProduct) => {

  // TODO: set product.valid_from to date.now
  newProduct.valid_from = new Date().toISOString();

  console.log("createProduct", newProduct);
  try {
    const result = await sequelize.transaction(async (t) => {
      const product = await model.products.create(newProduct, { transaction: t });
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

    const product = await model.products.findOne({ where: { product_id: productId } });
    if (!product) throw new Error("Error finding product");
    return product;

  } catch (error) {
    return { error: error.message };
  }
}


// works - gets all products (could have a search function also)
const getAllProducts = async () => {
  console.log("getAllProducts");
  try {

    const products = await model.products.findAll();
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
    const result = await sequelize.transaction(async (t) => {

      const updatedProduct = await model.products.update(productToUpdate,
        { where: { product_id: productToUpdate.product_id } },
        { transaction: t });

      // if it can't update product throws error
      if (!updatedProduct) throw new Error("Error updating product");

      // finds updated product and returns it
      const product = await model.products.findOne({ where: { product_id: productToUpdate.product_id } });
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
    const result = await sequelize.transaction(async (t) => {

      const deletedProduct = await model.products.destroy({ where: { product_id: productId } }, { transaction: t })
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
        const result = await sequelize.transaction(async (t) => {

          let archived = {
            is_archived: true
          }
          const archivedProduct = await model.products.update(archived, { where: { product_id: productId } }, { transaction: t });
          if (!archivedProduct) throw new Error("Error updating and archiving product");

          const product = await model.products.findOne({ where: { product_id: productId } });

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