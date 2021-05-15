const config = require("../configuration/config");
const mongoose = require('mongoose');

const createMongoConnection = () => {
    try{
        mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'connection error:'));
        
        db.once('open', () => {
          // we're connected!
          console.log('MONGO: connected');
        });

    }catch(error){
        console.log(error);
    }
}

// used in app.js to initialize connection
module.exports.createMongoConnection = createMongoConnection;