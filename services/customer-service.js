const models = require('../database/connect').models;
const sequelize = require('../database/connect').database;

const getCustomer = async (id) => {
    try {
        const customer = await models.customers.findOne({where: {customer_id: id}})

        console.log("getCustomer", customer);
    
        if (!customer) throw new Error("No customer");

        return customer;

    } catch (error) {
        return { error: error.message };
    }
}

const createCustomer = async (newCustomer) => {
    console.log("createCustomer input", newCustomer);

    try {
        if (newCustomer.is_user_profile === 1) 
            throw new Error(`The property 'is_user_profile' should be 0 when creating a customer without a user`);
        
        const createdCustomer = await models.customers.create(newCustomer)

        if (!createdCustomer) throw new Error("No customer");

        console.log("createdCustomers", createdCustomer);

        return createdCustomer;

    } catch (error) {
        return { error: error.message };
    }
}

// no update service on customer as it will get updated through user service

// no delete service on customer as we will never delete a customer from the backend

const getAllCustomers = async () => {
    try {
        let customers = await models.customers.findAll();

        console.log("getCustomers", customers);
    
        if (!customers) throw new Error("No customers");

        return customers;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getCustomer,
    createCustomer,
    getAllCustomers,
}