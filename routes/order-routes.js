const router = require('express').Router();

// gets calls from service/controller layer
const orderService = require('../services/order-service');

// create new order
router.post("/order", orderService.createOrder);

// get specific order by id
router.get("/order", orderService.getOneOrder);

// get all orders
router.get("/orders", orderService.getAllOrders);

// search by key and value
router.get("/search", orderService.searchOrders);

module.exports = router;