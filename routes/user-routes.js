const router = require('express').Router();
const userService = require('../services/user-service');
const { checkAuth } = require("./route-authorization");
const { role } = require("./route-authorization");

router.get("/user", checkAuth([role.USER, role.EMPLOYEE, role.ADMIN]), async (req, res) => {
    try {
        const id = req.query.id;
        
        if (!id) throw new Error("No id");
        
        const user = await userService.getUser(id);

        if (!user.error) {
            res.status(200).send(user);
        } else {
            res.status(500).send({ response: user.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post("/user", async (req, res) => {
    try {
        const newUser = req.body;

        const created = await userService.createUser(newUser);

        if (!created.error) {
           res.status(200).send(`User with user_id: ${created.user.user_id} and customer_id: ${created.customer.customer_id} was created`);
        } else {
            res.status(500).send({ response: created.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put("/user", async (req, res) => {
    try {
        const user = req.body;
        console.log("user", user);

        const updated = await userService.updateUser(user);

        if (!updated.error) {
           res.status(200).send(`User with user_id: ${updated.user.user_id} and customer_id: ${updated.customer.customer_id} was updated`);
        } else {
            res.status(500).send({ response: updated.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete("/user", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) throw new Error("No id");
        
        const user = await userService.deleteUser(id);
        
        if (!user.error) {
            res.status(200).send(`The field 'is_archived' is set to '${user.is_archived}' for user with 'user_id': ${user.user_id}`
            );
        } else {
            res.status(500).send(user.error);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get("/users", async (req, res) => {
    try {
        const user = await userService.getAllUsers();
        
        if (!user.error) {
            res.status(200).send(user);
        } else {
            res.status(500).send({ response: created.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/users/search", async (req, res) => {
    try{
        const property = req.query.property;
        const value = req.query.value;

        if (!property || !value) throw new Error("Mssing property or value as query parameters");

        const users = await userService.searchUsers(property, value);
        
        if (!users.error) {
            res.status(200).send(users);
        } else {
            res.status(500).send({ response: created.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;