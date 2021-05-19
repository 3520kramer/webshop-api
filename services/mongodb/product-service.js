const Product = require('../../models/mongodb/products');


// works - create one (probably needs a transaction) 
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


//  - get one specific by id
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


// works - get all
const getAllProducts = async () => {
    console.log("Mongo getAllProducts");
    try {

        const product = await Product.find({});
        return product;

    } catch (error) {
        return { error: error.message };
    }
}



module.exports = {
    createProduct,
    getOneProduct,
    getAllProducts,
}
