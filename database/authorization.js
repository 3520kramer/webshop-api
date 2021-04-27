const config = require("../configuration/config.json");
const updateSequelizeConnection = require("./connect").updateSequelizeConnection;

// Roles as constants to make sure we dont misspell it
const role = {
  ADMIN: "admin",
  DEVELOPER: "developer",
  EMPLOYEE: "employee",
  USER: "user",
  VISITOR: "visitor",
};

// Function for checking session id on routes request
// Takes a list of the roles we wan't to allow on the route as argument
const checkAuth = (roles) => {
  return async (req, res, next) => {
    console.log("req.session.sessionSecret", req.session.sessionSecret);
    
    // if the session secret is undefined, then this is the first page we are visiting
    if (req.session.sessionSecret === undefined) {
      req.session.sessionSecret = config.sessionSecret[role.VISITOR];
    }

    console.log("sessionSecret", req.session.sessionSecret);

    let hasRoleMatch = false;

    // Iterating the roles to find a matching Role
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      
      if (req.session.sessionSecret === config.sessionSecret[role]) {
        console.log("active role secret:", config.sessionSecret[role]);

        // Update the db connection
        updateSequelizeConnection(role);
        
        hasRoleMatch = true;

        // We allow it to continue on the route if there is a match, and then break out of the loop
        next();
        break;
      }
    }
    if (!hasRoleMatch) return res.status(401).send({ response: "not allowed" });
  };
};

// test route for now with checkAuth
const router = require("express").Router();
router.get("/test", checkAuth([role.USER]), (req, res) => {
  return res.status(200).send({ response: "hallo this is the secret route" });
});

module.exports = {
  checkAuth,
  role,
};
