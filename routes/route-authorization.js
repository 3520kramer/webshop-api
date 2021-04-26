const config = require("../configuration/config.json");
const settings = require('../configuration/settings');

// Roles as constants to make sure we dont misspell it
const role = {
    USER: "user",
    EMPLOYEE: "employee",
    DEVELOPER: "developer",
    ADMIN: "admin",
    VISITOR: "visitor", 
}

// Function for checking session id on routes request
// Takes a list of the roles we wan't to allow on the route as argument
const checkAuth = (roles) => {
    return (req, res, next) => {
        console.log("req.session.sessionSecret", req.session.sessionSecret);

        let hasRoleMatch = false;

        // Iterating the roles to find a matching Role
        roles.forEach(role => {
            if (req.session.sessionSecret === config.sessionSecret[role]) {
                console.log("logged in - secret:", config.sessionSecret[role]);
                
                // Setting the database connection settings to the ones matching the role
                settings.USER = config.databaseSecret[role].user;
                settings.PASSWORD = config.databaseSecret[role].password;

                hasRoleMatch = true;

                // We allow it to continue on the route if there is a match
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