module.exports = {
    "secretID":  process.env.SECRET_ID,
    "sessionSecret": {
        "visitor": process.env.SESSION_SECRET_VISITOR,
        "user": process.env.SESSION_SECRET_USER,
        "employee": process.env.SESSION_SECRET_EMPLOYEE,
        "developer": process.env.SESSION_SECRET_DEVELOPER,
        "admin": process.env.SESSION_SECRET_ADMIN
    },
    "databaseName": process.env.DATABASE_NAME,
    "sqlConnectionHost": process.env.SQL_CONNECTION_HOST,
    "sqlConnectionPort": process.env.SQL_CONNECTION_PORT,
    "databaseSecret": {
        "visitor": {"user": process.env.DATABASE_SECRET_VISITOR_USERNAME, "password": process.env.DATABASE_SECRET_VISITOR_PASSWORD},
        "user": {"user": process.env.DATABASE_SECRET_USER_USERNAME, "password": process.env.DATABASE_SECRET_USER_PASSWORD},
        "employee": {"user": process.env.DATABASE_SECRET_EMPLOYEE_USERNAME, "password": process.env.DATABASE_SECRET_EMPLOYEE_PASSWORD},
        "developer": {"user": process.env.DATABASE_SECRET_DEVELOPER_USERNAME, "password": process.env.DATABASE_SECRET_DEVELOPER_PASSWORD},
        "admin": {"user": process.env.DATABASE_SECRET_ADMIN_USERNAME, "password": process.env.DATABASE_SECRET_ADMIN_PASSWORD}
    },
    "mongoConnectionString": process.env.MONGO_CONNECTION_STRING,
    "rootURL": process.env.ROOT_URL
}