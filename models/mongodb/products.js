const mongoose = require('mongoose');
const { Schema } = mongoose;

// const material = new Schema({ material: { type: String, required: true }, _id: false });
const material = new Schema({ material: String, _id: false });

const productSchema = new Schema({
    sqlProductId: { type: Number },
    name: { type: String, required: true },
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true },
    brand: { type: String, required: true },

    color: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },

    materials: [material],
    timestamp: { type: Date, required: true },
    description: { type: String, required: true },
    isArchived: { type: Boolean, required: true },
})

const ProductModel = mongoose.model('Product', productSchema);

module.exports.ProductModel = ProductModel;
module.exports.ProductSchema = productSchema;