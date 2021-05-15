const router = require('express').Router();
const customerService = require('../services/mysql/customer-service');
const { checkAuth, role } = require("../database/authorization");
const config = require('../configuration/config');

router.get("/customer/:customer_id", checkAuth([role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Customer']
    // #swagger.summary = 'Roles required: User, Employee, Developer or Admin' 
    // #swagger.description = 'This is the route for getting a customer'

    try {
        const id = req.params.customer_id;
        console.log(id);
        if (!id) throw new Error("No id");

        const customer = config.isMongoUsed ? null : await customerService.getCustomer(id);

        if (!customer.error) {
            res.status(200).send(customer);
        } else {
            res.status(500).send({ response: customer.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post("/customer", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Customer']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin' 
    // #swagger.description = 'This is the route for getting creating a customer'

    /* #swagger.parameters['customer'] = {
           in: 'body',
           required: true,
           type: 'object',
           schema: { $ref: "#/definitions/AddCustomer" }
    } */

    try {
        const customer = req.body.customer;
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

router.get("/customers", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Customer']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin' 
    // #swagger.description = 'This is the route for getting all customers. Limited to 1000 results for performance reasons'
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