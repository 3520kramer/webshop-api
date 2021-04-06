const router = require('express').Router();
const customerService = require('../services/customer-service');

router.get("/customer", customerService.getCustomer);

router.post("/customer", customerService.createCustomer);

router.put("/customer", customerService.updateCustomer);

router.get("/customers", customerService.getAllCustomers)

module.exports = router;