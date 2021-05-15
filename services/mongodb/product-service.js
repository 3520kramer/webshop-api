const Product = require('../../models/mongodb/products');

const getAllProducts = async () => {
    const product = await Product.find({});
    
    console.log("product", product);
    
    return product;
}

module.exports = {
    getAllProducts
}
