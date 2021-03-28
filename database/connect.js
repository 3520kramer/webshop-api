var Sequelize = require('sequelize');

const config = require('../configuration/settings');

var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});

var initModels = require("../models/init-models");
var models = initModels(sequelize); 

module.exports.database = sequelize;
module.exports.seq = Sequelize;
module.exports.models = models;
  