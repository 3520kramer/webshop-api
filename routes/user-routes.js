const router = require('express').Router();
const userService = require('../services/user-service');

router.get("/user", userService.getUser);

router.post("/user", userService.createUser);

router.put("/user", userService.updateUser);

router.get("/users", userService.getAllUsers);

  module.exports = router;