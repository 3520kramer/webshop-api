const router = require('express').Router();

// used for setting the session values as priviliges and user id 
const config = require('../configuration/config.json').databaseSecret;

// gets calls from service/controller layer
const loginService = require('../services/login-service');

// for auth
const { checkAuth, role } = require("../database/authorization");

router.post('/login/user', checkAuth([role.VISITOR, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Login'] 
    // #swagger.summary = 'Roles required: Visitor, Employee, Developer or Admin' 
    // #swagger.description = 'This is the route for the user login. This is needed for getting access to certain routes. <br><br> <b>Example login:</b> <br>username: user1<br>password: user1kode'

    /* #swagger.parameters['login'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/LoginUser" }
    } */
    try {
        const { username, password } = req.body.login;

        if (!username) throw new Error("No username in body");
        if (!password) throw new Error("No password in body");

        const result = await loginService.loginUser(username, password);
        
        if (!result.error) {
            console.log("result.sessionSecret", result.sessionSecret);
            console.log("req.session.sessionSecret", req.session.sessionSecret);

            req.session.sessionSecret = result.sessionSecret;
            req.session.userId = result.userId;
            req.session.username = result.username;

            console.log("req.session.sessionSecret", req.session.sessionSecret);


            res.status(200).send({ response: req.session.username + " - logged in" });
        } else {
            res.status(500).send({ response: result.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/login/employee', checkAuth([role.VISITOR, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = 'Roles required: Visitor, Employee, Developer or Admin' 
    // #swagger.description = 'This is the route for the employee login. this is needed for getting access to certain routes.<br><br><b>Example admin login:</b> <br>username: admin@gmail.com<br>password: adminkode<br><br> <b>Example developer login:</b> <br>username: madsrunefrederiksen@gmail.com<br>password: madskode <br><br> <b>Example employee login:</b> <br>username: employee@gmail.com<br>password: employeekode'

    /* #swagger.parameters['login'] = {
       in: 'body',
       required: true,
       type: 'object',
       schema: { $ref: "#/definitions/LoginEmployee" }
    } */
    console.log("/employeelogin");

    try {
        const { email, password } = req.body.login;

        if (!email) throw new Error("No email in body");
        if (!password) throw new Error("No password in body");

        const result = await loginService.loginEmployee(email, password);

        if (!result.error) {
            console.log("result.sessionSecret", result.sessionSecret);
            console.log("req.session.sessionSecret1", req.session.sessionSecret);
            
            req.session.sessionSecret = result.sessionSecret;
            req.session.userId = result.employeeId;
            req.session.username = result.email;
            
            console.log("req.session.sessionSecret2", req.session.sessionSecret);


            res.status(200).send({ response: req.session.username + " - logged in" });
        } else {
            res.status(500).send({ response: result.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.post('/register/user', checkAuth([role.VISITOR, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = 'Roles required: Visitor, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for the creating a new user'

    /* #swagger.parameters['newUser'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/RegisterUser" }
    } */

    console.log("register/user");
    try {
        const newUser = req.body.user;

        const created = await loginService.registerUser(newUser);
        if (!created.error) {
            res.status(200).send(`User with user_id: ${created.user.user_id} and customer_id: ${created.customer.customer_id} was created`);
        } else {
            res.status(500).send({ response: created.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/logout', checkAuth([role.USER, role.EMPLOYEE, role.DEVELOPER, role.ADMIN]), async (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = 'Roles required: User, Employee, Developer or Admin'
    // #swagger.description = 'This is the route for the user/employee to logout'
    try {
        req.session.destroy((error) => {
            if (error) throw new Error(`Error destroying session: ${error}`);

            res.status(200).send({ response: "logout" })
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/hashedpassword', loginService.hashTest);

module.exports = router;