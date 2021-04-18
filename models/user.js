const database = require('../database/connect').database;
const Sequelize = require('../database/connect').seq;

let User = database.define('users', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    createdDate: {
      type: Sequelize.DATE,
      field: 'created_date'
    },
  },{
      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      //freezeTableName: true, // Model tableName will be the same as the model name
      
      // Setting timestamps as false will disable 'createdAt' and 'updatedAt'
      timestamps: false,
      //createdAt: 'created_date',
      //updatedAt: false, 
    });

module.exports = User;