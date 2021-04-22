const config = require("../configuration/config.json");
const settings = require('../configuration/settings');


const role = {
    USER: "user", // read, create, update
    EMPLOYEE: "employee", // read, create, update
    ADMIN: "admin", // All
    VISITOR: "visitor", // read, create user
}

// Function for checking session id on routes request
const checkAuth = (roles) => {
    return (req, res, next) => {
        console.log("req.session.sessionSecret", req.session.sessionSecret);

        let hasRoleMatch = false;

        roles.forEach(role => {
            if (req.session.sessionSecret === config.sessionSecret[role]) {
                console.log("logged in - secret:", config.sessionSecret[role]);

                settings.USER = config.databaseSecret[role].user;
                settings.PASSWORD = config.databaseSecret[role].password;

                hasRoleMatch = true;

                next();
            }
        });
        if (!hasRoleMatch) return res.status(401).send({ response: "not allowed" });
    }
};

// test route for now with checkAuth
const router = require('express').Router();
router.get("/test", checkAuth([role.USER]), (req, res) => {
    return res.status(200).send({ response: "hallo this is the secret route" });
});

module.exports = {
    checkAuth,
    role
}