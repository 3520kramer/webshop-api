const getModels = require('../database/connection-mysql').getModels;




const createCustomer = async (newCustomer) => {
    console.log("createCustomer input", newCustomer);

    try {
        if (newCustomer.is_user_profile === 1)
            throw new Error(`The property 'is_user_profile' should be 0 when creating a customer without a user`);

        const createdCustomer = await getModels().customers.create(newCustomer)

        if (!createdCustomer) throw new Error("No customer");

        console.log("createdCustomers", createdCustomer);

        return createdCustomer;

    } catch (error) {
        return { error: error.message };
    }
}


// get one specific customer
const getCustomer = async (id) => {
    try {
        const customer = await getModels().customers.findOne({ where: { customer_id: id } })

        console.log("getCustomer", customer);

        if (!customer) throw new Error("No customer");

        return customer;

    } catch (error) {
        return { error: error.message };
    }
}


// Gets all customers
const getAllCustomers = async () => {
    try {
        let customers = await getModels().customers.findAll({ limit: 1000 });

        console.log("getCustomers", customers);

        if (!customers) throw new Error("No customers");

        return customers;
    } catch (error) {
        return { error: error.message };
    }
}

// no update service on customer as it will get updated through user service
// no delete service on customer as we will never delete a customer from the backend

module.exports = {
    getCustomer,
    createCustomer,
    getAllCustomers,
}