const router = require('express').Router();
const sequelize = require('../database/connect').database;
var DataTypes = require("sequelize").DataTypes;
var product = require('../models/products')(sequelize, DataTypes);


router.get("/product", (req, res) => {
  let input = req.query.id
  product.findOne({where: {product_id: input}}).then(function (product) {
      console.log(product);
      res.send(product);
  });
})


router.get("/products", (req, res) => {    
  product.findAll().then(function (product) {
      console.log(product);
      res.send(product);
  });
})


  module.exports = router;