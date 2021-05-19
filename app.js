const express = require("express");
const app = express();
require('dotenv').config();
const config = require('./configuration/config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// takes the PORT from env. if nothing specified then pick port 3000
const port = process.env.PORT ? process.env.PORT : 3000;

// Error handling on server upstart
app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("This server is running on port:", port);
});
