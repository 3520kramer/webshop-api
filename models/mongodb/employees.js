const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    sqlEmployeeId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    salary: { type: Number, required: true },
    jobTitle: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cpr: { type: String, required: true },
    hiredDate: { type: Date, required: true },
    postalCode: { type: String, required: true },
})

const Model = mongoose.model('Employee', employeeSchema);

module.exports = Model;