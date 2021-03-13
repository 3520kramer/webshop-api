const database = require('../database/connect').database;
const seq = require('../database/connect').seq;

let User = database.define('users', {
    user_id: {
        type: seq.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: seq.STRING,
        field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
    }, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });


    module.exports = User;