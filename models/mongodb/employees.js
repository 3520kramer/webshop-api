const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = require('./products');


const orderMaterial = new Schema({ material: String }, { _id: false });



const orderSchema = new Schema({
    comment: String,
    created: Date,
    shipper: String,
    employee: String,
    products: [productSchema],
    sqlOrderid: String,
    orderStatus: String,
    shippedDate: String,
    deliveryType: String,
    poBoxDelivery: String,
    shipmentPrice: String,
    customerBilling: String,
    customerDelivery: String
})


const Model = mongoose.model('Product', productSchema);

module.exports = Model;