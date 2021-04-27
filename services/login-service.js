const models = require('../database/connect').models;
const { role } = require('../routes/route-authorization');
const userService = require('./user-service');

// Connects to the session secret  
const { sessionSecret } = require("../configuration/config.json");

// A library to help you hash passwords.
const bcrypt = require('bcrypt');

// When you are hashing your data the module will go through a series of rounds to give you a secure hash.
const saltRounds = 12;

// works
const loginUser = async (username, password) => {
    try {
        const user = await models.users.findOne({ where: { username: username } });

        if (!user) throw new Error("Something went wrong when getting information from database");

        const result = await bcrypt.compare(password, user.password);

        if (!result) throw new Error("username or password incorrect, try again");

        // TODO: Generate random and hash that bitch
        //const generateRandomString = (length=36) =>Math.random().toString(20).substr(2, length)
        //let test = generateRandomString();
        //sessionSecret.user = test;

        return {
            sessionSecret: sessionSecret.user,
            userId: user.user_id,
            username: user.username
        }
    } catch (error) {
        return { error: error.message };
    }
};

const loginEmployee = async (email, password) => {
    try {
        const employee = await models.employees.findOne({ where: { email: email } });

        if (!employee) throw new Error("Something went wrong when getting information from database");

        const result = await bcrypt.compare(password, employee.password);

        if (!result) throw new Error("email or password incorrect, try again");

        let _sessionSecret;

        if (employee.job_title.toLowerCase() === role.ADMIN) {
            _sessionSecret = sessionSecret.admin;
        }
        else if (employee.job_title.toLowerCase() === role.DEVELOPER) {
            _sessionSecret = sessionSecret.developer;
        }
        else {
            _sessionSecret = sessionSecret.employee;
        }

        return {
            sessionSecret: _sessionSecret,
            employeeId: employee.employeeId,
            email: employee.email,
        }

    } catch (error) {
        return { error: error.message };
    }
};

const registerUser = async (newUser) => {
    console.log("registerUser", newUser);
    try {
        let hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

        newUser.password = hashedPassword

        const createdUser = await userService.createUser(newUser);
        return createdUser;

    } catch (error) {
        return { error: error.message };
    }
};

// works
const hashTest = async (req, res) => {
    // #swagger.tags = ['Login']
    bcrypt.hash(req.query.pw, saltRounds).then(result => res.send(result));
};

module.exports = {
    loginUser,
    loginEmployee,
    registerUser,
    hashTest,
}