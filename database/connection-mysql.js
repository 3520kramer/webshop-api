const Sequelize = require("sequelize");
const initModels = require("../models/mysql/init-models");
const config = require("../configuration/config");
const { Model } = require("sequelize");

const createSequelizeConnection = (user, password) => {
  return new Sequelize(config.databaseName, user, password, {
    host: config.sqlConnectionHost,
    port: config.sqlConnectionPort,
    dialect: "mysql",
    pool: {
      max: 10, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      idle: 20000, // The maximum time, in milliseconds, that a connection can be idle before being released.
      acquire: 60000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      //logging: (...msg) => console.log(msg) // A function that gets executed every time Sequelize would log something. Function may receive multiple parameters but only first one is printed by console.log
    },
  });
}

// The default connection created on initialization as visitor 
let sequelizeConnection = createSequelizeConnection(config.databaseSecret.visitor.user, config.databaseSecret.visitor.password);

// Updates the sequilize connection depending on the role
const updateSequelizeConnection = (role) => {  
  let currentSequelizeUser = sequelizeConnection.connectionManager.config.username;
  let possibleNewSequelizeUser = config.databaseSecret[role].user;

  // Check if the current connection credentials is the same as the new to avoid opening and closing connections to much
  if(currentSequelizeUser !== possibleNewSequelizeUser){
    console.log("CLOSING CONNECTION AND CREATING NEW");
    
    // Close old connection
    sequelizeConnection.close();
    
    // Open new connection
    sequelizeConnection = createSequelizeConnection(config.databaseSecret[role].user, config.databaseSecret[role].password);

  }else{
    console.log("CONNECTION KEPT OPEN");
  }
};

// Instantiates the models depending with the current connection
const getModels = () => initModels(sequelizeConnection);
const getDatabase = () => sequelizeConnection;

module.exports.updateSequelizeConnection = updateSequelizeConnection;
module.exports.getModels = getModels;
module.exports.getDatabase = getDatabase;
