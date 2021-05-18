const mongoose = require('mongoose');
const { Schema } = mongoose;

const order = new Schema({ sqlOrderId: Number });

const userCustomerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    sqlUserId: String,
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
    orders: [order]
})

const UserCustomerModel = mongoose.model('userCustomer', userCustomerSchema);

module.exports = UserCustomerModel;