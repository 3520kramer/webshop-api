const mongoose = require('mongoose');
const { Schema } = mongoose;


const employeeOrderSchema = new Schema({
    firstName: { type: String, required: true },
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
}, { _id: false })

const shipmentSchema = new Schema({
    shipper: { type: String, required: true },
    deliveryType: { type: String, required: true },
    shipmentPrice: { type: Number, required: true }
}, { _id: false })

const customerOrderSchema = new Schema({
    userCustomerId: { type: Schema.Types.ObjectId },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
    countriesISO: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false })


const poBoxDeliverySchema = new Schema({
    poBox: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false })

const material = new Schema({ material: { type: String, required: true }, _id: false });

const productSchema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    materials: [material],
    description: { type: String, required: true },
    quantity: { type: Number, required: true }
}, { _id: false })


const orderSchema = new Schema({
    comment: { type: String },
    created: { type: Date, required: true },
    shipment: {type: shipmentSchema, required: true },
    employee: { type: employeeOrderSchema },
    products: [productSchema],
    sqlOrderid: { type: Number },
    orderStatus: { type: String, enum: ['NOT PROCESSED', 'PROCESSING', 'SHIPPED', 'CANCELLED'], required: true },
    shippedDate: { type: Date },
    poBoxDelivery: { type: poBoxDeliverySchema },
    customerBilling: { type: customerOrderSchema, required: true },
    customerDelivery: { type: customerOrderSchema }
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