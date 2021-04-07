const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../database/connect').database;
const productModel = require('../models/products')(sequelize, DataTypes);


/* Ex. for postman
{
    "name": "cool cape", 
    "price": 1800,
    "size": "l",
    "description": "totally awesome cape",
    "brand_id": 2, 
    "color_id": 2,
    "manufacturer_id": 2, 
    "category_id": 2,
    "is_archived": false 
}
*/

// works
const createProduct = async (req, res) => {
    console.log("createProduct", req.body);
    let input = req.body
    try {
      await sequelize.transaction(async (t) => {
      const product = await productModel.create({
        product_id: null, 
        name: input.name,
        price: input.price,
        size: input.size,
        description: input.description,
        brands_brand_id: input.brand_id, 
        colors_color_id: input.color_id,
        manufacturers_manufacturer_id: input.manufacturer_id, 
        categories_category_id: input.category_id,
        is_archived: input.is_archived 
      }, { transaction: t });

      
      if (product) {
        return res.status(201).json({product});
      }

    })
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

// works
const getOneProduct = async (req, res) => {
  console.log("getOneProduct", req.body);
  let input = req.query.id
  productModel.findOne({where: {product_id: input}}).then(function (productModel) {
      console.log(productModel);
      res.send(productModel);
  });
}

// works
const getAllProducts = async (req, res) => {
  console.log("getAllProducts", req.body);
  productModel.findAll().then(function (productModel) {
    console.log(productModel);
    res.send(productModel);
});
}
  
/* Ex. for postman
params: productid 27
{
    "name": "extra cool cape", 
    "price": 111,
    "size": "l",
    "description": "totally mega awesome cape",
    "brand_id": 2, 
    "color_id": 2,
    "manufacturer_id": 2, 
    "category_id": 2 
}
*/

// works but probably needs a transaction
const updateProduct = async (req, res) => {
  console.log("updateProduct params", req.query.productid);
  console.log("updateProduct body", req.body);
  
  const {productid} = req.query; 

  try {
    await sequelize.transaction(async (t) => { 
    const [ updated ] = await productModel.update(req.body, {where: { product_id: productid }}, { transaction: t });
    if (updated) {
      const updatedProduct = await productModel.findOne({ where: { product_id: productid } });
      return res.status(200).json({ product: updatedProduct });
    }  
    throw new Error('Product not found');
    })
  } 
  catch (error) {
    return res.status(500).send(error.message);
  } 

}


// ugly but works
const deleteProduct = async (req, res) => {
    console.log('deleteProduct', req.query);
    const { productid } = req.query;

    try {
      await sequelize.transaction(async (t) => {
        const deleted = await productModel.destroy({where: {product_id: productid}}, { transaction: t })

        if (deleted) {
          return res.status(200).send("Product deleted");  
        }

      })
      } catch (error) {

        if (error.parent.code === "ER_ROW_IS_REFERENCED_2") {
          try {
            await sequelize.transaction(async (t) => {

              let archived = {
                is_archived: true
              }

              const [ updated ] = await productModel.update(archived, {where: { product_id: productid }}, { transaction: t });
              
              if (updated) {
                const updatedProduct = await productModel.findOne({ where: { product_id: productid } });
                return res.status(200).json({ product: updatedProduct });
              }  
              
              throw new Error('Product not found');
            }) 
          }
          catch (error) {
            return res.status(500).send(error.message);
          } 
        } else {
          return res.status(500).send(error.message);
        }
      } 

    };

module.exports = {
    createProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}