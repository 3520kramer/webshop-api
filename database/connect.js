const Sequelize = require('sequelize');
const config = require('../configuration/settings');


const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 10,        // Maximum number of connection in pool
      min: 0,         // Minimum number of connection in pool
      idle: 20000,    // The maximum time, in milliseconds, that a connection can be idle before being released.
      acquire: 60000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      //logging: (...msg) => console.log(msg) // A function that gets executed every time Sequelize would log something. Function may receive multiple parameters but only first one is printed by console.log
    },
});

const initModels = require("../models/init-models");
const models = initModels(sequelize); 

module.exports.database = sequelize;
module.exports.seq = Sequelize;
module.exports.models = models;
