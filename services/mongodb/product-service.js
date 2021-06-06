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

// Switch to determine the sort order
// ascending = “1” -- descending = “-1”
const getSortOrder = {
    "1": "1",
    asc: "1",
    ascending: "1",
    "-1": "-1",
    desc: "-1",
    descending: "-1",
}

// works - get all products
const getAllProducts = async (sortBy, sortOrder) => {
    console.log("Mongo getAllProducts");
    try {
        let products;

        if(sortBy){
            // Checks if the model contains the field to sort by
            if(!Product.schema.path(sortBy)) throw new Error(`Error: product does not contain field '${sortBy}'`);

            // if the sortOrder from the request is valid then the value will be used
            // If not valid then the sortOrder will default to ascending order
            sortOrder = sortOrder.toLowerCase();
            const order = getSortOrder[sortOrder] !== undefined ? getSortOrder[sortOrder] : getSortOrder["ascending"];

            // Finds the product sorted by the column and in the order specified in the request
            products = await Product.find({}).sort({[sortBy]: order});  
        }else{
            products = await Product.find({});
        }
        
        if (!products) throw new Error("Error finding product");
        return products;

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
