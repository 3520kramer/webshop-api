const router = require('express').Router();

// gets calls from service/controller layer
const productService = require('../services/product-service');

// for auth
const { checkAuth, role } = require("../database/authorization");



// create new product
router.post("/product", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'This is the route for creating a new product'

    /* #swagger.parameters['product'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/AddProduct" },
    }   */

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
router.get("/product/:product_id", checkAuth([role.VISITOR, role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'This is the route for getting a specific product'
    console.log("get/product");
    try {
        let id = Number.parseInt(req.params.product_id);
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
router.get("/products", checkAuth([role.VISITOR, role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'This is the route for getting all products'
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
router.put("/product", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'This is the route for updating a product'

    /* #swagger.parameters['updatedProduct'] = {
    in: 'body',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/EditProduct" },
    }   */
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
router.delete("/product/:product_id", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'This is the route for deleting a product (if possible, else if in use archives it)'
    console.log("delete/product");
    try {
        let id = Number.parseInt(req.params.product_id);
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