const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({ 
    sqlOrderId: { type: Number, required: true }
}, {_id : false });

const userCustomerSchema = new Schema({
    sqlUserId: { type: Number },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdDate: { type: String, required: true },
    isArchived: { type: Boolean, required: true },
    lastLoggedIn: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    citiesPostalCode: { type: Number, required: true },
    city: { type: String, required: true },
    countriesISO: { type: String, required: true },
    country: { type: String, required: true },
    orders: [orderSchema]
})

const Model = mongoose.model('usercustomers', userCustomerSchema);

module.exports.UserCustomerModel = Model;
module.exports.UserCustomerOrderSchema = orderSchema;