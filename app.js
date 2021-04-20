const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Used to be able to establish permission for the user to enter the site and also be able to track them
const session = require("express-session");
const config = require("./configuration/config.json");
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));


// Function for checking session id on routes request 
const checkAuth = (req, res, next) => {
    if (req.session.userId != config.sessionSecret)  {
      return res.status(401).send({ response: "not allowed" });
    } else {
        console.log('checkAuth logged in', req.session.userId + " = " + config.sessionSecret);
        next();
    };
};


// get routes. These have to be after the checkAuth function or else it can't find req.session.userId
const userRoutes = require('./routes/user-routes');
const customerRoutes = require('./routes/customer-routes')
const productRoutes = require('./routes/product-routes');
const orderRoutes = require('./routes/order-routes');
const loginRoutes = require('./routes/login-routes');


// use routes 
app.use(userRoutes);
app.use(customerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(loginRoutes);


// test route for now with checkAuth
app.get("/test", checkAuth, (req, res) => {
    return res.status(200).send({ response: "hallo this is the secret route" });
});


const port = process.env.PORT ? process.env.PORT : 6000;

// Error handling on server upstart
app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("This server is running on port:", port);
});