const router = require('express').Router();

// gets calls from service/controller layer
const loginService = require('../services/login-service');


router.post('/login', loginService.login);

// router.post('/register', loginService.signup);

router.get('/logout', loginService.logout);

module.exports = router;