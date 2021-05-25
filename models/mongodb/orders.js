const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = require('./products').ProductSchema;

const employeeOrderSchema = new Schema({
    firstName: { type: String, required: true },
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
})

const shipmentSchema = new Schema({
    shipper: { type: String, required: true },
    deliveryType: { type: String, required: true },
    shipmentPrice: { type: Number, required: true }
})

const customerOrderSchema = new Schema({
    sqlUserId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
    countriesISO: { type: String, required: true },
    country: { type: String, required: true }
})

const poBoxDeliverySchema = new Schema({
    poBox: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: Number, required: true },
    city: { type: Number, required: true },
    country: { type: Number, required: true }
})

const poBoxDeliverySchema = new Schema({
    poBox: String,
    street: String,
    postalCode: Number,
    city: Number,
    country: Number

})

const orderSchema = new Schema({
    comment: { type: String },
    created: { type: Date, required: true },
    shipment: [shipmentSchema],
    employee: [employeeOrderSchema],
    products: [productSchema],
    sqlOrderid: { type: Number },
    orderStatus: { type: String, enum: ['NOT PROCESSED', 'PROCESSING', 'SHIPPED', 'CANCELLED'], required: true },
    shippedDate: { type: Date },
    poBoxDelivery: [poBoxDeliverySchema],
    customerBilling: [customerOrderSchema],
    customerDelivery: [customerOrderSchema]
})

const Model = mongoose.model('Order', orderSchema);

module.exports.OrderModel = Model;
module.exports.schemes = {
    productSchema,
    employeeOrderSchema,
    shipmentSchema,
    customerOrderSchema,
    poBoxDeliverySchema,
}