const models = require('../database/connect').models;
const sequelize = require('../database/connect').database;

const getUser = async (req, res) => {
    let user_id = req.query.user_id;
    console.log("getUser input", user_id);

    try {
        let user = await models.users.findOne({where: {user_id: user_id}})

        console.log("getUser", user);
    
        if (!user) throw new Error("No user");

        res.status(200).send(user);

    } catch(error){
        if(error.message === "No user"){
            res.status(404).send(error.message);
        }else{
            res.sendStatus(500);
        }
    }

}

const createUser = async (req, res) => {
    let _newUser = req.body;
    console.log("createUser input", _newUser);

    try {
        let newUser = await models.users.create(_newUser)

        if (!newUser) throw new Error("No user");

        console.log("getUser", user);

        res.status(200).send(user);

    } catch(error){
        if(error.message === "No user"){
            res.status(404).send(error.message);
        }else{
            res.sendStatus(500);
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
            res.sendStatus(500);
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
    createCustomerAndUser,
}