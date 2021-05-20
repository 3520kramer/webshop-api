const router = require('express').Router();
const userService = require('../services/mysql/user-service');
const userCustomerServiceMongo = require('../services/mongodb/userCustomer-service');


// for auth
const { checkAuth, role } = require("../database/authorization");

// used for creating a user. also used in login service for creating a user/customer
router.post("/user", checkAuth([role.VISITOR, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Roles required: Visitor, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for creating a user'

    /* #swagger.parameters['newUser'] = {
               in: 'body',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/AddUser" }
    } */

    try {
        const newUser = config.isMongoUsed ? req.body.userCustomer : req.body.user;

        const created = config.isMongoUsed ? await userCustomerServiceMongo.createUserCustomer(newUser) : await userService.createUser(newUser);

        if (!created.error) {
            config.isMongoUsed ?
                res.status(200).send(created)
                :
                res.status(200).send(`User with user_id: ${created.user.user_id} and customer_id: ${created.customer.customer_id} was created`);
        } else {
            res.status(500).send({ response: created.error });
        }
    } catch (error) {
        res.status(500).send({ errorOut: error.message });
    }
});

const config = require('../configuration/config');

// gets one specific user 
router.get("/user/:user_id", checkAuth([role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Roles required: User, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for getting a single users information'
    try {
        
        const id = req.params.user_id;
        if (!id) throw new Error("No id");

        const user = config.isMongoUsed ? await userCustomerServiceMongo.getUser(id) : await userService.getUser(id);

        if (!user.error) {
            res.status(200).send(user);
        } else {
            res.status(500).send({ response: user.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/users", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin'
    // #swagger.description = 'This is the route for getting all users. Limited to 1000 results for performance reasons'

    try {
        const user = config.isMongoUsed ? await userCustomerServiceMongo.getAllUsers() : await userService.getAllUsers();

        if (!user.error) {
            res.status(200).send(user);
        } else {
            res.status(500).send({ response: created.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// search in users 
router.get("/users/search/:property/:value", checkAuth([role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Roles required: Employee, Developer or Admin'
    // #swagger.description = 'This is the route for searching users'

    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/AddUser" }
    } */

    try {
        const property = req.params.property;
        const value = req.params.value;

        if (!property || !value) throw new Error("Missing property or value as query parameters");

        const users = config.isMongoUsed ? await userCustomerServiceMongo.searchUsers(property, value) : await userService.searchUsers(property, value);

        if (!users.error) {
            res.status(200).send(users);
        } else {
            res.status(500).send({ response: users.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put("/user", checkAuth([role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Roles required: User, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for updating a users infomation'

    /* #swagger.parameters['user'] = {
           in: 'body',
           required: true,
           type: 'object',
           schema: { $ref: "#/definitions/EditUser" }
    } */

    try {
        const user = config.isMongoUsed ? req.body.userCustomer : req.body.user;

        console.log("user", user);

        const updated = config.isMongoUsed ? await userCustomerServiceMongo.updateUser(user) : await userService.updateUser(user);

        if (!updated.error) {
            config.isMongoUsed ?
            res.status(200).send(updated)
            :
            res.status(200).send(`User with user_id: ${updated.user.user_id} and customer_id: ${updated.customer.customer_id} was updated`);
        } else {
            res.status(500).send({ response: updated.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete("/user/:user_id", checkAuth([role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Roles required: User, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for deleting a user (archives it and uses a stored procedure that is triggered by an event that deletes user/customer/orders/order_product'
    try {
        const id = req.params.user_id;
        if (!id) throw new Error("No id");

        const user = config.isMongoUsed ? await userCustomerServiceMongo.deleteUser(id) : await userService.deleteUser(id);

        if (!user.error) {
            console.log('user', user)
            const isArchived = config.isMongoUsed ? user.isArchived : user.is_archived;
            const userId = config.isMongoUsed ? user._id : user.user_id;
            res.status(200).send(`The field 'is_archived' is set to '${isArchived}' for user with 'user_id': ${userId}`
            );
        } else {
            res.status(500).send(user.error);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;