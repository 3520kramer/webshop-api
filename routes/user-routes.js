const router = require('express').Router();
const userModel = require('../models/user');
const userService = require('../services/user-service');

router.get("/user", (req, res) => {
  let input = req.query.id
  userModel.findOne({where: {user_id: input}}).then(function (user) {
      console.log(user);
      res.send(user);
  });
})

router.post("/user", (req, res) => {
  let input = req.body
  userService.createUser(input.username, input.password, input.created_date);
  
  res.send("Nice")
})

router.get("/users", (req, res) => {    
  userModel.findAll().then(function (user) {
      console.log(user);
      res.send(user);
  });
})

  module.exports = router;