const Product = require('../../models/mongodb/products').ProductModel;


// works - create one product (probably needs a transaction) 
const createProduct = async (newProduct) => {
    console.log("Mongo createProduct", newProduct);
    try {
        // take the current date/time and sets timestamp
        newProduct.timestamp = new Date().toISOString();

        const product = await new Product(newProduct).save();
        console.log("product", product);

        if (!product) throw new Error("Error finding product");
        return product;

    } catch (error) {
        return { error: error.message };
    }
}


// works - get one specific by id
const getOneProduct = async (productId) => {
    console.log("getOneProduct", productId);
    try {
        const product = await Product.findById(productId);
        if (product === null) throw new Error("Error finding product");
        return product;

    } catch (error) {
        return { error: error.message };
    }
}


// works - get all products
const getAllProducts = async () => {
    console.log("Mongo getAllProducts");
    try {

        const product = await Product.find({});
        if (!product) throw new Error("Error finding product");
        return product;

    } catch (error) {
        return { error: error.message };
    }
}

// works - update product
const updateProduct = async (productToUpdate) => {
    console.log("Mongo updateProduct", productToUpdate);

    try {
        // finds and updates document. returns the old document data that it finds
        const updatedProduct = await Product.findByIdAndUpdate(productToUpdate._id, productToUpdate);
        if (!updatedProduct) throw new Error("Error updating product");

        // finds the new updated product in collection
        const product = await Product.findById(productToUpdate._id);
        if (product === null) throw new Error("Error finding product");
        return product;

    } catch (error) {
        return { error: error.message };
    }
}

const deleteProduct = async (productId) => {
    console.log("Mongo deleteProduct", productId);

    try {
        const product = await Product.findByIdAndDelete(productId);
        console.log("product", product);
        return product;
    } catch (error) {
        return { error: error.message };
    }
}


module.exports = {
    createProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}
