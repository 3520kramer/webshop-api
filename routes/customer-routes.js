const router = require('express').Router();
const customerService = require('../services/customer-service');

router.get("/customer", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) throw new Error("No id");
        const customer = await customerService.getCustomer(id);

        if (!customer.error) {
            res.status(200).send(customer);
        } else {
            res.status(500).send({ response: customer.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post("/customer", async (req, res) => {
    try {
        const customer = req.body;
        if (!customer) throw new Error("No customer");
        const updatedCustomer = await customerService.createCustomer(customer);

        if (!updatedCustomer.error) {
            res.status(200).send(updatedCustomer);
        } else {
            res.status(500).send({ response: updatedCustomer.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/customers", async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();

        if (!customers.error) {
            res.status(200).send(customers);
        } else {
            res.status(500).send({ response: customers.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;