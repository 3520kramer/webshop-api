const UserCustomer = require('../../models/mongodb/userCustomers').UserCustomerModel;
const UserCustomerOrderSchema = require('../../models/mongodb/userCustomers').UserCustomerOrderSchema;

// gets a user (including the customer)
const getUser = async (id) => {
    try {
        const user = await UserCustomer.findById(id);

        if (!user) throw new Error("No user");

        return user;

    } catch (error) {
        return { error: error.message };
    }
}

const createUserCustomer = async (newUser) => {
    try{
        const createdUserCustomer = await new UserCustomer(newUser).save();

        if (!createdUserCustomer) throw new Error("Error creating user");
        
        return createdUserCustomer;

    }catch (error) {
        return { error: error.message };
    }
}

const updateUser = async (user) => {
    try{
        const userToUpdate = await UserCustomer.findById(user._id);

        if (!userToUpdate) throw new Error("No user found");

        console.log("userToUpdate", userToUpdate);
        
        const userToUpdatePOJO = userToUpdate.toObject();

        Object.entries(user).forEach(([key, value]) => {
            if (!userToUpdatePOJO.hasOwnProperty(key)) {
                throw new Error(`Database object does not contain property: ${key}`);
            
            }else if(key === '__v'){
                return;

            }else if(key === 'orders'){
                const OrderPOJO = UserCustomerOrderSchema.obj;

                user.orders.forEach((order, index) => {
                    Object.entries(order).forEach(([key, value]) => {
                        if (!OrderPOJO.hasOwnProperty(key)) {
                            throw new Error(`Database object does not contain property "${key}"`);
                        }
                        userToUpdate.orders[index][key] = value;
                    });
                });
            }else{
                userToUpdate[key] = value;
            }
        })

        const updatedUser = await userToUpdate.save();

        return updatedUser;

    }catch (error) {
        return { error: error.message };
    }
}

const getAllUsers = async () => {
    try {
        const users = await UserCustomer.find({});

        if (!users) throw new Error("No users");

        return users;

    } catch (error) {
        return { error: error.message };
    }
}

// we don't delete, but we are setting is_archived to true
const deleteUser = async (id) => {
    try {
        const userToUpdate = await UserCustomer.findById(id);

        if (!userToUpdate) throw new Error("No user");

        userToUpdate.isArchived = true;

        const updatedUser = await userToUpdate.save();

        return updatedUser;

    } catch (error) {
        return { error: error.message };
    }
}

const createUserCustomerTransaction = async (newUser) => {
    console.log("createUserCustomer", newUser);

    try {

        const session = await UserCustomer.startSession();

        try{

            session.startTransaction();
    
            const createdUserCustomer = await new UserCustomer(newUser).save({ session });

            if (!createdUserCustomer) throw new Error("Error creating user");

            await session.commitTransaction();
            
            return createdUserCustomer;

        }catch(error){
            session.abortTransaction();
            return { error: error.message };
        }finally{
            session.endSession();
        }

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getUser,
    createUserCustomer,
    updateUser,
    deleteUser,
    getAllUsers,
    createUserCustomerTransaction  
}