const router = require('express').Router();

// gets calls from service/controller layer
const orderService = require('../services/order-service');

// create new order for our six scenarios
router.post("/order", async (req, res) => {
    console.log("post/order");
    try {
        
        let customer = req.body.customer;
        let order = req.body.order;
        let product = req.body.product;
        let userId = Number.parseInt(req.session.userId);

        let key = Number.parseInt(req.query.shipment_type);


        switch (key) {
            case 1: // user sends to own address

                if(!userId) throw new Error("user_id required");

                const orderUser = await orderService.createOrderForUserToOwnAddress(order, product, userId);
                if (!orderUser.error) {
                    res.status(201).send(orderUser);
                } else {
                    res.status(500).json({ response: orderUser.error });
                }
                break;
            case 2:
                const orderCustomer = await orderService.createOrderForCustomerToPO(order, product, customer);
                if (!orderCustomer.error) {
                    res.status(201).send(orderCustomer);
                } else {
                    res.status(500).json({ response: orderCustomer.error });
                }
                break;
            case 3:
                console.log(3);
                res.status(501).send({response: "not implemented yet"});
                break;
            case 4:
                console.log(4);
                res.status(501).send({response: "not implemented yet"});
                break;
            case 5:
                console.log(5);
                res.status(501).send({response: "not implemented yet"});
                break;
            case 6:
                console.log(6);
                res.status(501).send({response: "not implemented yet"});
                break;
            default:
                break;
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// get specific order by id
router.get("/order", async (req, res) => {
    console.log("get/order");
    try {
        let id = Number.parseInt(req.query.order_id);
        const order = await orderService.getOneOrder(id);

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
router.get("/orders", async (req, res) => {
    console.log("get/orders");
    try {
        let page = req.query.page;
        let size = req.query.size;
        const orders = await orderService.getAllOrders(page, size);

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
router.get("/orderssearch", async (req, res) => {
    console.log("get/orderssearch");
    try {
        let id = req.query.id;
        let page = req.query.page;
        let search = req.query.search;
        const ordersSearch = await orderService.ordersSearch(id, page, search);

        if (!ordersSearch.error) {
            res.status(201).send(ordersSearch);
        } else {
            res.status(500).json({ response: ordersSearch.error });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// finds orders related to a user
router.get("/orders/users", async (req, res) => {
    try {
        const user_id = req.query.user_id;
        if (!user_id) throw new Error("No user_id");

        const orders = await orderService.getUsersOrders(user_id);
        
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