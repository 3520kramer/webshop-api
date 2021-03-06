const config = require("../configuration/config");
const mongoose = require("mongoose");

const createMongoConnection = () => {
  try {
    mongoose.connect(config.mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", () => {
      // we're connected!
      console.log("MONGO: Connection opened");
    });

  } catch (error) {
    console.log(error);
  }
};

const closeMongoConnection = () => {
  try {
    mongoose.disconnect().then(() => console.log("MONGO: Connection closed"));
  } catch (error) {
    console.log(error);
  }
};

const updateMongoConnection = async (role) => {
  try {
    const user = config.databaseSecretMongo[role].user;
    const password = config.databaseSecretMongo[role].password;
    const databaseName = config.databaseName;

    const newConnectionString = `mongodb+srv://${user}:${password}@cluster0.tfmsf.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    console.log("updateMongoConnection");

    if (config.mongoConnectionString !== newConnectionString) {
      config.mongoConnectionString = newConnectionString;
      closeMongoConnection();
      createMongoConnection();
    } else {
      console.log("MONGO CONNECTION KEPT OPEN");
    }
  } catch (error) {
    console.log(error);
  }
};

// used in app.js to initialize connection
module.exports = {
  createMongoConnection,
  closeMongoConnection,
  updateMongoConnection,
};
