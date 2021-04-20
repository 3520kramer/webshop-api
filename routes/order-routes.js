const router = require('express').Router();

// gets calls from service/controller layer
const orderService = require('../services/order-service');

// create new order
router.post("/order", async (req, res) => {
    console.log("post/order");
    try {
        let customer = req.body.customer;
        let order = req.body.order;
        let product = req.body.product;
        let user_id = Number.parseInt(req.query.user_id);

        const key = Number.parseInt(req.query.shipment_type);

        switch (key) {
            case 1: // user sends to own address
                const createdOrder = await orderService.createOrderForUserToOwnAddress(order, product, user_id);
                if (!createdOrder.error) {
                    res.status(201).send(createdOrder);
                } else {
                    res.status(500).json({ response: createdOrder.error });
                }
                break;
            case 2:
                console.log(2);
                break;
            case 3:
                console.log(3);
                break;
            case 4:
                console.log(4);
                break;
            case 5:
                console.log(5);
                break;
            case 6:
                console.log(6);
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
        let id = req.query.id;
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

module.exports = router;