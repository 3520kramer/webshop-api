const mongoose = require('mongoose');
const { Schema } = mongoose;

const material = new Schema({ material: String }, { _id: false });

const productSchema = new Schema({
    sqlProductId: Number,
    name: String,
    size: String,
    brand: String,
    color: String,
    price: Number,
    category: String,
    materials: [material],
    timestamp: Date,
    description: String,
    isArchived: Boolean,
})

const ProductModel = mongoose.model('Product', productSchema);

module.exports.ProductModel = ProductModel;
module.exports.ProductSchema = productSchema;