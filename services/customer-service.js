const models = require('../database/connect').models;
const sequelize = require('../database/connect').database;

const getCustomer = async (req, res) => {
    let customer_id = req.query.customer_id;

    console.log("getCustomers input", customer_id);

    try {
        let customer = await models.customers.findOne({where: {customer_id: customer_id}})

        console.log("getCustomer", customer);
    
        if (!user) throw new Error("No customer");

        res.status(200).send(customer);

    } catch(error){
        if(error.message === "No customer"){
            res.status(404).send(error.message);
        }else{
            res.sendStatus(500);
        }
    }
}

const createCustomer = async (req, res) => {
    let _newCustomer = req.body;
    console.log("createCustomer input", _newCustomer);

    try {
        let newCustomer = await models.customers.create(_newCustomer)

        if (!newCustomer) throw new Error("No customer");

        console.log("createCustomer", newCustomer);

        res.status(200).send(newCustomer);

    } catch(error){
        if(error.message === "No customer"){
            res.status(404).send(error.message);
        }else{
            res.sendStatus(500);
        }
    }
}

const updateCustomer = async (req, res) => {
    let input = req.body; 
    console.log("updateCustomer input", input);
    
    try{
        const customerToUpdate = await models.customers.findOne({where: {user_id: input.user_id}});
        
        if (!customerToUpdate) throw new Error("No customer found");
        
        Object.entries(input).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            
            if(!customerToUpdate.dataValues.hasOwnProperty(key)){
                throw new Error(`Database object does not contain property "${key}"`);
            }
            customerToUpdate[key] = value;
        })

        await customerToUpdate.save();

        res.send(customerToUpdate);

    }catch(error){
        
        if(error.message === "No customer found"){
            res.status(404).send(error.message)
        }else{
            res.status(400).send(error.message)
        }
    }
};


const getAllCustomers = async (req, res) => {
    try {
        let customers = await models.customers.findAll();

        console.log("getCustomers", customers);
    
        if (!customers) throw new Error("No customers");

        res.status(200).send(user);

    } catch(error){
        if(error.message === "No customers"){
            res.status(404).send(error.message);
        }else{
            res.sendStatus(500);
        }
    }
}
// no delete on customer
// delete route is update is_archived

module.exports = {
    getCustomer,
    createCustomer,
    updateCustomer,
    getAllCustomers,
}