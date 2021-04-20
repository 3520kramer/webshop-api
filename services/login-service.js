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
const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username: username } });

        if (!user) throw new Error("Something went wrong when getting information from database");

        const result = await bcrypt.compare(password, user.password);

        if (!result) throw new Error("username or password incorrect, try again");

        return {
            sessionSecret: sessionId.sessionSecret.user,
            userId: user.userId,
            username: user.username
        }
    } catch (error) {
        return { error: error.message };
    }
};

const loginEmployee = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username: username } });

        if (!user) throw new Error("Something went wrong when getting information from database");

        const result = await bcrypt.compare(password, user.password);

        if (!result) throw new Error("username or password incorrect, try again");

        return {
            sessionSecret: sessionId.sessionSecret,
            userId: user.userId,
            username: user.username
        }
    } catch (error) {
        return { error: error.message };
    }
};




// works
const logout = async (req, res) => {
    console.log("logout");
    req.session.destroy((err) => {
        return res.status(200).send({ response: "logout" });
    });
};

// works
const hashTest = async (req, res) => {
    bcrypt.hash(req.query.pw, saltRounds).then(result => res.send(result));
};

module.exports = {
    loginUser,
    loginEmployee,
    //signup,
    logout,
    hashTest,
}