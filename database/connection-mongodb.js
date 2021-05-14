const config = require("../configuration/config.json");
const mongoose = require('mongoose');

const createMongoConnection = (user, password) => {

    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

}