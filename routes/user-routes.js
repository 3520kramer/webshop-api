const userModel = require('../models/user');
const router = require('express').Router();


router.get("/user", (req, res) => {
  let input = req.query.id
  userModel.findOne({where: {user_id: input}}).then(function (user) {
      console.log(user);
      res.send(user);
  });
})
  

router.get("/users", (req, res) => {    
  userModel.findAll().then(function (user) {
      console.log(user);
      res.send(user);
  });
})

  module.exports = router;