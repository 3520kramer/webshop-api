const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({ sqlOrderId: Number }, { _id : false });

const userCustomerSchema = new Schema({
    sqlUserId: Number,
    username: String,
    password: String,
    createdDate: Date,
    isArchived: Boolean,
    lastLoggedIn: String,
    firstName: String,
    lastName: String,
    street: String,
    email: String,
    phone: String,
    citiesPostalCode: Number,
    city: String,
    countriesISO: String,
    country: String,
    orders: [orderSchema]
})

const UserCustomerModel = mongoose.model('userCustomers', userCustomerSchema);

module.exports.UserCustomerModel = UserCustomerModel;
module.exports.UserCustomerOrderSchema = orderSchema;