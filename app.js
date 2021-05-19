const express = require("express");
const app = express();
require('dotenv').config();
const config = require('./configuration/config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This is all for swagger-ui 
const http = require('http');


// Redirects to swagger sql url from base url
app.get('/', (req, res) => {
    res.redirect('/swagger');
});

// Used to be able to establish permission for the user to enter the site and also be able to track them
const session = require("express-session");

app.use(session({
    secret: config.secretID,
    resave: false,
    saveUninitialized: true,
}));

// get routes. These have to be after the checkAuth function or else it can't find req.session.userId
const userRoutes = require('./routes/user-routes');
const customerRoutes = require('./routes/customer-routes')
const productRoutes = require('./routes/product-routes');
const orderRoutes = require('./routes/order-routes');
const loginRoutes = require('./routes/login-routes');
const swaggerConfig = require('./swagger/swaggerConfig').router;

// use routes 
app.use(userRoutes);
app.use(customerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(loginRoutes);
app.use(swaggerConfig);

// for some stupid reason only works on port 3000 - https://github.com/lukeautry/tsoa/issues/518
const port = process.env.PORT ? process.env.PORT : 3000;

// If we are not using mongo db then sql connection stays true. If using mongodb then isSql is false
//config.isMongoUsed = process.env.USE_MONGO_DB === 'true' ? true : false;

//console.log(config.isMongoUsed)

// Connects to mongo on startup
//if(config.isMongoUsed) createMongoConnection();

// Error handling on server upstart
http.createServer(app).listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("This server is running on port:", port);
});
