const mongoose = require('mongoose');
const { Schema } = mongoose;

const material = new Schema({ material: String});

const productSchema = new Schema({
    sqlId: Number,
    name: String,
    size: String,
    brand: String,
    color: String,
    price: String,
    category: String,
    materials: [material],
    timestamp: Date,
    description: String,
    isArchived: Boolean,
})

const Model = mongoose.model('Product', productSchema);

module.exports = Model;