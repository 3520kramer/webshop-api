const router = require('express').Router();

// gets calls from service/controller layer
const loginService = require('../services/login-service');


router.post('/login/user', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) throw new Error("No username in body");
        if (!password) throw new Error("No password in body");

        const result = await loginService.loginUser(username, password);

        if (!result.error) {
            req.session.sessionSecret = result.sessionSecret;
            req.session.userId = result.userId;
            req.session.username = result.username;

            res.status(200).send({ response: req.session.username + " - logged in" });
        } else {
            res.status(500).send({ response: result.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/login/employee', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) throw new Error("No username in body");
        if (!password) throw new Error("No password in body");

        const result = await loginService.loginUser(username, password);

        if (!result.error) {
            req.session.sessionSecret = result.sessionSecret;
            req.session.userId = result.userId;
            req.session.username = result.username;

            res.status(200).send({ response: req.session.username + " - logged in" });
        } else {
            res.status(500).send({ response: result.error });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// router.post('/register', loginService.signup);

router.get('/logout', loginService.logout);

router.get('/hashedpassword', loginService.hashTest);

module.exports = router;