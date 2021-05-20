const router = require('express').Router();

// gets calls from service/controller layer
const orderService = require('../services/mysql/order-service');
const orderServiceMongo = require('../services/mongodb/order-service');

// for auth
const { checkAuth, role } = require("../database/authorization");

const config = require('../configuration/config');

// create new order for our six scenarios
router.post("/order", checkAuth([role.VISITOR, role.USER]), async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.summary = 'Roles required: Visitor or User'
    // #swagger.description = 'This is the route for the creating a new order. a bit bugged since i dont know how to work with multiple schemas you have to copy/paste response 200 while being logged in to checkout user buying something. Other than that for some reason the product array only uses the last index'

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/OrderTypeOne" },
            description: 'This is for testing where user sends to own address you need to be logged in as a user for this' 
    } */

    /* #swagger.parameters['key'] = {
            in: 'body',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/OrderTypeTwo" },
            description: 'This is for testing where a non user sends to a PO box'
    }   */

    console.log("post/order");
    try {

        let customer = req.body.customer;
        let order = req.body.order;
        let product = req.body.product;
        let key = Number.parseInt(req.body.shipment_type);
        let userId = Number.parseInt(req.session.userId);


        switch (key) {
            case 1: // user sends to own address

                if (!userId) throw new Error("user_id required");

                const orderUser = await orderService.createOrderForUserToOwnAddress(order, product, userId);
                if (!orderUser.error) {
                    res.status(201).send(orderUser);
                } else {
                    res.status(500).json({ response: orderUser.error });
                }
                break;
            case 2:
                const orderCustomer = await orderService.createOrderForCustomerToPO(order, product, customer);
                console.log("orderCustomer", orderCustomer);
                if (!orderCustomer.error) {
                    res.status(201).send(orderCustomer);
                } else {
                    res.status(500).json({ response: orderCustomer.error });
                }
                break;
            case 3:
                console.log(3);
                res.status(501).send({ response: "not implemented yet" });
                break;
            case 4:
                console.log(4);
                res.status(501).send({ response: "not implemented yet" });
                break;
            case 5:
                console.log(5);
                res.status(501).send({ response: "not implemented yet" });
                break;
            case 6:
                console.log(6);
                res.status(501).send({ response: "not implemented yet" });
                break;
            default:
                break;
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// get specific order by id
router.get("/order/:order_id", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin'
    // #swagger.description = 'This is the route for getting a specific order.'
    console.log("get/order");
    try {
        let id = config.isMongoUsed ? req.params.order_id : Number.parseInt(req.params.order_id);
        const order = config.isMongoUsed ? await orderServiceMongo.getOneOrder(id) : await orderService.getOneOrder(id);

        if (!order.error) {
            res.status(201).send(order);
        } else {
            res.status(500).json({ response: order.error });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// get all orders
router.get("/orders/:page/:size", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin'
    // #swagger.description = 'This is the route for getting all orders. Can use pagination. Use 0 value if wanna use default values of p1/s1000'
    console.log("get/orders");
    try {
        let page = req.params.page;
        let size = req.params.size;
        const orders = config.isMongoUsed ? await orderServiceMongo.getAllOrders(page, size) : await orderService.getAllOrders(page, size);

        if (!orders.error) {
            res.status(201).send(orders);
        } else {
            res.status(500).json({ response: orders.error });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// search by key and value
router.get("/orders/search/:key/:value/:page", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin'
    // #swagger.description = 'This is the route for seaching in orders with pagination. Key-value based. EX. KEY: "order_status" VALUE: "shipped"'
    console.log("get/orderssearch");
    try {
        let key = req.params.key.trim();
        let value = req.params.value;
        let page = req.params.page;

        const ordersSearch = config.isMongoUsed? await orderServiceMongo.ordersSearch(key, value, page) : await orderService.ordersSearch(key, value, page);

        if (!ordersSearch.error) {
            res.status(201).send(ordersSearch);
        } else {
            res.status(500).json({ response: ordersSearch.error });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// finds orders related to a user. Right now only a user login works with this route. 
router.get("/orderoverview/user", checkAuth([role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.summary = 'Roles required: User, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for getting a users order overview.'
    try {

        // uses the session user id so that only the user who is logged in can see their own orderhistory
        let id = Number.parseInt(req.session.userId);
        
        // this is for manual finding orderoverview for a user
        //const id = req.params.user_id;
        if (!id) throw new Error("No id, remember to be logged in as a user");

        const orders = await orderService.getUsersOrders(id);

        if (!orders.error) {
            res.status(200).send(orders);
        } else {
            res.status(500).send({ response: orders.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
module.exports = router;