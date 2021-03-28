const router = require('express').Router();
const userService = require('../services/user-service');

router.get("/user", async (req, res) => {
  let user_id = req.query.user_id;

  let user = await userService.getUser(user_id);
  
  res.send(user)
})

router.post("/user", async (req, res) => {
  let input = req.body;
  
  let newUser = await userService.createUser(
    input //input.username, input.password, input.created_date 
  );
  
  res.send(newUser)
})

router.post("/customer", async (req, res) => {
  let input = req.body;
  
  let newUser = await userService.createCustomer(
    input
  );
  
  res.send(newUser)
})

router.post("/customer-and-user", async (req, res) => {
  let _newUser = req.body.user;
  let _newCustomer = req.body.customer;
  
  let newUserCustomer =  await userService.createCustomerAndUser(
    _newUser, _newCustomer
  );
  
  res.send(newUserCustomer)
})

router.get("/users", async (req, res) => {    
  let users = await userService.getAllUsers();
  
  res.send(users);
})

  module.exports = router;