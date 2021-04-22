const router = require('express').Router();

// gets calls from service/controller layer
const productService = require('../services/product-service');

// create new product
router.post("/product", async (req, res) => {
    // #swagger.tags = ['Product']
    console.log("post/product");
    try {
        let product = req.body.product;

        const createdProduct = await productService.createProduct(product);

        if (!createdProduct.error) {
            res.status(201).send(createdProduct);
        } else {
            res.status(500).json({ response: createdProduct.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get specific product by id
router.get("/product", async (req, res) => {
    // #swagger.tags = ['Product']
    console.log("get/product");
    try {
        let id = Number.parseInt(req.query.product_id);
        const product = await productService.getOneProduct(id);

        if (!product.error) {
            res.status(201).send(product);
        } else {
            res.status(500).json({ response: product.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get all products
router.get("/products", async (req, res) => {
    // #swagger.tags = ['Product']
    console.log("get/products");
    try {
        const products = await productService.getAllProducts();

        if (!products.error) {
            res.status(201).send(products);
        } else {
            res.status(500).json({ response: products.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


});

// update product 
router.put("/product", async (req, res) => {
    // #swagger.tags = ['Product']
    console.log("put/product");

    let product = req.body.product;

    try {
        const updatedProduct = await productService.updateProduct(product);
        if (!updatedProduct.error) {
            res.status(201).send(updatedProduct);
        } else {
            res.status(500).json({ response: updatedProduct.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// delete product
router.delete("/product", async (req, res) => {
    // #swagger.tags = ['Product']
    console.log("delete/product");
    try {
        let id = Number.parseInt(req.query.product_id);
        const deletedProduct = await productService.deleteProduct(id);

        if (!deletedProduct.error) {
            res.status(202).send(deletedProduct);
        } else {
            res.status(500).json({ response: deletedProduct.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;