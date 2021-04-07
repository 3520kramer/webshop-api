const router = require('express').Router();

// gets calls from service/controller layer
const productService = require('../services/product-service'); 

// create new product
router.post("/product", productService.createProduct);

// get specific product by id
router.get("/product", productService.getOneProduct);

// get all products
router.get("/products", productService.getAllProducts)

// update product 
router.put("/product", productService.updateProduct);

// delete product
router.delete("/product", productService.deleteProduct);


module.exports = router;