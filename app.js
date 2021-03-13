const express = require("express");
const app = express();
var Sequelize = require('sequelize');

const config = require('./configuration/settings');


var sequelize1 = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

app.get("/", (req, res) => {

    const response = {
        say: 'hello world'
    }

    res.send(response)
});

let User1 = sequelize1.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
    }, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });


app.get("/user1", (req, res) => {
    let input = req.query.id
    User1.findOne({where: {user_id: input}}).then(function (user) {
        console.log(user);
        res.send(user);
    });
  })
  
  
  app.get("/users1", (req, res) => {    
    User1.findAll().then(function (user) {
        console.log(user);
        res.send(user);
    });
  })

app.listen(5000);

app.listen(6000);