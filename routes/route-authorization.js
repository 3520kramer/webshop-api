const config = require("../configuration/config.json");

const role = {
    USER: "user",
    EMPLOYEE: "employee",
    ADMIN: "admin"
}

// Function for checking session id on routes request
const checkAuth = (types) => {
    return (req, res, next) => {
        console.log("req.session.sessionSecret", req.session.sessionSecret);

        let hasTypeMatch = false;

        types.forEach(type => {
            if (req.session.sessionSecret === config.sessionSecret[type]){
                console.log("logged in - secret:", config.sessionSecret[type]);
                next();
                hasTypeMatch = true;
            }
        });
    if(!hasTypeMatch) return res.status(401).send({ response: "not allowed" });
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