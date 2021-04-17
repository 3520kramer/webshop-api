const router = require('express').Router();
const userService = require('../services/user-service');

// router.get("/user", userService.getUser);

router.get("/user", async (req, res) => {
    let input = req.query.id;

    let user = await userService.getUser2(input);

    console.log(user);

    res.send(user);
});


router.post("/user", userService.createUser);

router.put("/user", userService.updateUser);

router.get("/users", userService.getAllUsers);

router.get("/users/search", userService.searchUsers);

module.exports = router;