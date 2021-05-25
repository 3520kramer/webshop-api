const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = require('./products').ProductSchema;

const employeeOrderSchema = new Schema({
    firstName: String,
    sqlEmployeeId: Number
})

const shipmentSchema = new Schema({
    shipper: String,
    deliveryType: String,
    shipmentPrice: Number
})

const customerOrderSchema = new Schema({
    sqlUserId: Number,
    firstName: String,
    lastName: String,
    street: String,
    email: String,
    phone: String,
    postalCode: Number,
    city: String,
    countriesISO: String,
    country: String,
})

const poBoxDeliverySchema = new Schema({
    poBox: String,
    street: String,
    postalCode: Number,
    city: Number,
    country: Number

})

const orderSchema = new Schema({
    comment: String,
    created: Date,
    shipment: [shipmentSchema],
    employee: [employeeOrderSchema],
    products: [productSchema],
    sqlOrderid: Number,
    orderStatus: String,
    shippedDate: Date,
    poBoxDelivery: [poBoxDeliverySchema],
    customerBilling: [customerOrderSchema],
    customerDelivery: [customerOrderSchema]
})

const Model = mongoose.model('Orders', orderSchema);

module.exports.OrderModel = Model;
module.exports.schemes = {
    productSchema,
    employeeOrderSchema,
    shipmentSchema,
    customerOrderSchema,
    poBoxDeliverySchema,
}