const models = require('../database/connect').models;
const sequelize = require('../database/connect').database;

const getUser = async (user_id) => {
    let user = models.users.findOne({where: {user_id: user_id}}).then(result => {
        console.log("getUser", result);
        return result;
    });
    return await user;
}

const createUser = async (_newUser) => {
    console.log("createUser", _newUser);

    let newUser = await models.users.create(_newUser).then(result => {
        console.log("createUser", result);
        return result;
    })

    return await newUser;
};

const updateUser = async (_userToUpdate) => {
    console.log("updateUser", _userToUpdate);

    let userToUpdate = await getUser(_userToUpdate.user_id);
    console.log(userToUpdate);

    return await newUser;
};

// const createCustomer = async (first_name, last_name, street, email, phone, cities_postal_code, countries_iso) => {
//    let _newCustomer = { first_name, last_name, street, email, phone, cities_postal_code, countries_iso }

const createCustomer = async (_newCustomer) => {
    
    let newCustomer = await models.customers.create(_newCustomer);

    console.log("newCustomer", newCustomer);

    return await newCustomer;
};

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

const getAllUsers = async () => {
    let users = await models.users.findAll().then(result => {
        console.log("getAllUsers", result);
        return result
    });
    return users;
}

module.exports = {
    getUser,
    createUser,
    getAllUsers,
    createCustomer,
    createCustomerAndUser,
}