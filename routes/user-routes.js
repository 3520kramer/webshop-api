const userModel = require('../models/user');
const router = require('express').Router();


router.get("/user", (req, res) => {
  let input = req.query.id
  userModel.findOne({where: {user_id: input}}).then(function (user) {
      console.log(user);
      res.send(user);
  });
})

router.post("/user", (req, res) => {
  let input = req.body
  console.log(input)
  res.send("Nice")
})

router.get("/users", (req, res) => {    
  userModel.findAll().then(function (user) {
      console.log(user);
      res.send(user);
  });
})

  module.exports = router;