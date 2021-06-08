const UserCustomer = require('../../models/mongodb/userCustomers').UserCustomerModel;
const Employee = require('../../models/mongodb/employees');

const { role } = require('../../database/authorization');
const updateMongoConnection = require('../../database/connection-mongodb').updateMongoConnection;
const userCustomerService = require('./userCustomer-service');

// Connects to the session secret  
const { sessionSecret } = require("../../configuration/config");

// A library to help you hash passwords.
const bcrypt = require('bcrypt');

// When you are hashing your data the module will go through a series of rounds to give you a secure hash.
const saltRounds = 12;

// works
const loginUser = async (username, password) => {
    try {
        const user = await UserCustomer.findOne({ username: username });

        if (!user) throw new Error("Something went wrong when getting information from database");

        const result = await bcrypt.compare(password, user.password);

        if (!result) throw new Error("username or password incorrect, try again");

        user.last_logged_in = new Date().toISOString();

        await user.save();

        updateMongoConnection(role.USER);
        
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

        const employee = await Employee.findOne({ email: email });

        if (!employee) throw new Error("Something went wrong when getting information from database");

        const result = await bcrypt.compare(password, employee.password);

        if (!result) throw new Error("email or password incorrect, try again");

        let _sessionSecret;
        console.log("employee.jobTitle", employee.jobTitle);

        if (employee.jobTitle.toLowerCase() === role.ADMIN) {
            _sessionSecret = sessionSecret.admin;
            updateMongoConnection(role.ADMIN);
        } 
        else if (employee.jobTitle.toLowerCase() === role.DEVELOPER) {
            _sessionSecret = sessionSecret.developer;
            updateMongoConnection(role.DEVELOPER);
        }
        else {
            _sessionSecret = sessionSecret.employee;
            updateMongoConnection(role.EMPLOYEE);
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

        const createdUser = await userCustomerService.createUserCustomer(newUser);
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