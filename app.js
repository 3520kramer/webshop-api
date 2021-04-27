const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this is all for swagger-ui 
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Used to be able to establish permission for the user to enter the site and also be able to track them
const session = require("express-session");
const config = require("./configuration/config.json");

app.use(session({
    secret: config.sessionSecret.visitor,
    resave: false,
    saveUninitialized: true,
}));


// get routes. These have to be after the checkAuth function or else it can't find req.session.userId
const userRoutes = require('./routes/user-routes');
const customerRoutes = require('./routes/customer-routes')
const productRoutes = require('./routes/product-routes');
const orderRoutes = require('./routes/order-routes');
const loginRoutes = require('./routes/login-routes');
const settings = require("./configuration/settings");

// use routes 
app.use(userRoutes);
app.use(customerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(loginRoutes);

// for some stupid reason only works on port 3000 - https://github.com/lukeautry/tsoa/issues/518
const port = process.env.PORT ? process.env.PORT : 3000;

// Error handling on server upstart
http.createServer(app).listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("This server is running on port:", port);
});
