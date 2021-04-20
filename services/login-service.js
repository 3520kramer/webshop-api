const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../database/connect').database;
const User = require('../models/users')(sequelize, DataTypes);


// Connects to the session secret  
const sessionId = require("../configuration/config.json");


// A library to help you hash passwords.
const bcrypt = require('bcrypt');
// When you are hashing your data the module will go through a series of rounds to give you a secure hash.
const saltRounds = 12;


// works
const login = async (req, res) => {

    const { username, password } = req.body;
    console.log(req.body);

    if (username && password) {

        User.findOne({ where: { username: username } }).then((foundUser) => {
            try {
                bcrypt.compare(password, foundUser.password).then(result => {
                    //console.log("result", result);
                    if (result == true) {
                        req.session.userId = sessionId.sessionSecret;
                        req.session.username = foundUser.username;
                        req.session.password = password;
                        return res.status(200).send({ response: req.session.username + " - logged in" });
                    } else {
                        return res.status(401).send({ response: "username or password incorrect, try again" });
                    };
                });
            } catch (error) {
                return res.status(400).send({ response: "Something went wrong when getting information from database" });
            }
        })
    };
};


// works
const logout = async (req, res) => {
    console.log("logout");
    req.session.destroy((err) => {
        return res.status(200).send({ response: "logout" });
    });
};


module.exports = {
    login,
    //signup,
    logout
}