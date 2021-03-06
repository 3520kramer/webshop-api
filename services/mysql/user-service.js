const getModels = require('../../database/connection-mysql').getModels;
const { Op } = require("sequelize");

// gets a user (including the customer)
const getUser = async (id) => {
    try {
        const user = await getModels().users.findOne({
            where: { user_id: id },
            include: [{
                model: getModels().customers,
                as: "customers",
                required: true
            }]
        });

        if (!user) throw new Error("No user");

        return user;

    } catch (error) {
        return { error: error.message };
    }
}

// creates a user (including customer)
const createUser = async (newUser) => {
    console.log("createUser", newUser);

    try {
        if (!newUser.customers) throw new Error("The property 'customers' is required for creating a user");
        if (newUser.customers.is_user_profile === 0) throw new Error("The property 'is_user_profile' is required to be 1 when creating a user");

        const createdUser = await getModels().users.create(newUser, {
            include: [{
                model: getModels().customers,
                as: "customers"
            }]
        });

        if (!createdUser) throw new Error("Error creating user");
        return { user: createdUser.dataValues, customer: createdUser.customers[0].dataValues };

    } catch (error) {
        return { error: error.message };
    }
}

const updateUser = async (user) => {
    console.log("updateUser input user", user);

    try {
        const userToUpdate = await getModels().users.findOne({
            where: { user_id: user.user_id },
            include: [{
                model: getModels().customers,
                as: "customers",
                where: { "is_user_profile": true },
                required: true
            }]
        });

        if (!userToUpdate) throw new Error("No user found");

        Object.entries(user).forEach(([key, value]) => {
            if (key === 'customers') return;

            if (!userToUpdate.dataValues.hasOwnProperty(key)) {
                throw new Error(`Database object does not contain property: ${key}`);
            }
            userToUpdate[key] = value;
        })

        Object.entries(user.customers).forEach(([key, value]) => {
            if (!userToUpdate.customers[0].dataValues.hasOwnProperty(key)) {
                throw new Error(`Database object does not contain property "${key}"`);
            }
            userToUpdate.customers[key] = value;
        })
        
        // updating the user
        const updatedUser = await userToUpdate.save();
        
        // updating the related customer
        await getModels().customers.update(user.customers, {where: {"users_user_id": user.user_id, "is_user_profile": true}});

        return { user: updatedUser, customer: updatedUser.customers[0] };

    } catch (error) {
        return { error: error.message };
    }
};

// we don't delete, but we are setting is_archived to true
const deleteUser = async (id) => {
    try {
        const userToUpdate = await getModels().users.findOne({
            where: { user_id: id },
        });

        if (!userToUpdate) throw new Error("No user");

        userToUpdate.is_archived = true;

        await userToUpdate.save()

        return userToUpdate;

    } catch (error) {
        return { error: error.message };
    }
}

const getAllUsers = async () => {
    try {
        let users = await getModels().users.findAll({limit: 1000});

        console.log("getAllUsers", users);

        if (!users) throw new Error("No users");

        return users;

    } catch (error) {
        return { error: error.message };
    }
}

const searchUsers = async (property, value) => {
    try {
        let searchParams = {
            [property]: {
                [Op.like]: `%${value}%`
            }
        }

        console.log("searchUsers searchParams", searchParams);

        let isUserProp = getModels().users.rawAttributes.hasOwnProperty(property) ? true : false;

        let user = await getModels().users.findAll({
            where: isUserProp ? searchParams : null,
            include: [{
                model: getModels().customers,
                as: "customers",
                where: !isUserProp ? searchParams : null,
                required: true
            }]
        });

        console.log("searchUsers user", user);

        if (!user) throw new Error("No user");

        return user;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    searchUsers,
}