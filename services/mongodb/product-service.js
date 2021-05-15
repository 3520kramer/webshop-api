const Product = require('../../models/mongodb/products');

const getAllProducts = async () => {
    try{
        console.log("IN SERVICE LAYER GETALLPRODUCTS");
        const product = await Product.find({});
        
        console.log("product", product);
        
        return product;
    }catch(error){
        console.log(error);
        return error;
    }
    
}

module.exports = {
    getAllProducts
}
