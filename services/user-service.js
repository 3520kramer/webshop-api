const models = require('../database/connect').models;
const sequelize = require('../database/connect').database;
const { Op } = require("sequelize");

const getUser2 =  async (id) => {
    let user = await models.users.findOne({ where: {user_id: id} });
    return user;
}

const getUser = async (req, res) => {    
    let property = req.query.property;
    let searchParams = {[property]: req.query.value}
    
    console.log("getUser searchParams", searchParams);

    let isUserProp = models.users.rawAttributes.hasOwnProperty(property) ? true : false;

    try {
        let user = await models.customers.findOne({
            where: !isUserProp ? searchParams : null,
            include: [{
                model: models.users, 
                as: "users_user", 
                where: isUserProp ? searchParams : null, 
                required: true
            }]
        });
        
        console.log("getUser user", user);
    
        if (!user) throw new Error("No user");

        res.status(200).send(user);

    } catch(error){
        if(error.message === "No user"){
            res.status(404).send(error.message);
        }else{
            res.status(500).send(error.message);
        }
    }
}

const createUser = async (req, res) => {
    let _newUser = req.body.user;
    let _newCustomer = req.body.customer;
    console.log("createUser input", _newUser, _newCustomer);

    try {
        await sequelize.transaction(async (t) => {
            const newCustomer = await models.customers.create(_newCustomer, { transaction: t });
            console.log("newCustomer", newCustomer);
            
            _newUser.customers_customer_id = newCustomer.customer_id;
            console.log("_newUser", _newUser);
            
            const newUser = await models.users.create(_newUser, { transaction: t });
            
            console.log("newUser", newUser);

            if (!newUser) throw new Error("No user");
            
            res.status(200).send(`User with user_id: ${newUser.user_id} and customer_id: ${newCustomer.customer_id} was created`);
        });

    } catch(error){
        if(error.message === "No user"){
            res.status(404).send(error.message);
        }else{
            res.status(500).send(error.message);
        }
    }
}

const updateUser = async (req, res) => {
    let input = req.body; 
    console.log("updateUser input", input);
    
    try{
        const userToUpdate = await models.users.findOne({where: {user_id: input.user_id}});
        
        if (!userToUpdate) throw new Error("No user found");
        
        Object.entries(input).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            
            if(!userToUpdate.dataValues.hasOwnProperty(key)){
                throw new Error(`Database object does not contain property "${key}"`);
            }
            userToUpdate[key] = value;
        })

        await userToUpdate.save();

        res.send(userToUpdate);

    }catch(error){
        
        if(error.message === "No user found"){
            res.status(404).send(error.message)
        }else{
            res.status(400).send(error.message)
        }
    }
};

const getAllUsers = async (req, res) => {
    try {
        let users = await models.users.findAll();

        console.log("getUsers", users);
    
        if (!users) throw new Error("No users");

        res.status(200).send(user);

    } catch(error){
        if(error.message === "No users"){
            res.status(404).send(error.message);
        }else{
            res.status(500).send(error.message);
        }
    }
}

const searchUsers = async (req, res) => {    
    let property = req.query.property;
    let value = req.query.value;
    
    let searchParams = {
        [property]: {
            [Op.like]: `%${value}%`
        }
    }

    console.log("getUser searchParams", searchParams);

    let isUserProp = models.users.rawAttributes.hasOwnProperty(property) ? true : false;

    try {
        let user = await models.customers.findOne({
            where: !isUserProp ? searchParams : null,
            include: [{
                model: models.users, 
                as: "users_user", 
                where: isUserProp ? searchParams : null, 
                required: true
            }]
        });
        
        console.log("getUser user", user);
    
        if (!user) throw new Error("No user");

        res.status(200).send(user);

    } catch(error){
        if(error.message === "No user"){
            res.status(404).send(error.message);
        }else{
            res.status(500).send(error.message);
        }
    }
}

const createCustomerAndUser = async (_newUser, _newCustomer) => {
    try {
        let result = await sequelize.transaction(async (t) => {
            const newUser = await models.users.create(_newUser, { transaction: t });

            _newCustomer.users_user_id = newUser.user_id;

            const newCustomer = await models.customers.create(_newCustomer, { transaction: t });

            return await newCustomer;
        });

        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback
        return result;
        
    } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically
        console.error(error)
    }
}
/* Trying to create generic error response */
    // const sendErrorResponse = (error, res, messageAndCode=null, messagesAndCodes=null) => {
    //     if (!messageAndCode && !messagesAndCodes){
    //         res.sendStatus(500)
    //     }else if(messageAndCode !== null){
            
    //     }
    //     if(error.message === "No user"){
    //         res.status(404).send(error.message);
    //     }else{
    //         res.sendStatus(500);
    //     }
    // }

module.exports = {
    getUser,
    createUser,
    updateUser,
    getAllUsers,
    searchUsers,
    createCustomerAndUser,
    getUser2,
}