const router = require('express').Router();
const userService = require('../services/user-service');

router.get("/user", userService.getUser);

router.post("/user", userService.createUser);

router.put("/user", userService.updateUser);

router.get("/users", userService.getAllUsers);

router.post("/customer-and-user", async (req, res) => {
  
  let newUser = req.body.user;
  let newCustomer = req.body.customer;
  
  let newUserCustomer =  await userService.createCustomerAndUser(
    newUser, newCustomer
  );
  
  res.send(newUserCustomer)
})

  module.exports = router;