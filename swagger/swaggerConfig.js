const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('../configuration/config');
const MongoDb = require('../database/connection-mongodb');

const httpType = process.env.NODE_ENV === 'production' ? 'https' : 'http';
console.log("environment", process.env.NODE_ENV);
console.log("httpType", httpType);



// Swagger definition
const swaggerDefinitionMongo = {
    // info: General information about the API, such as: version, title and description.
    info: {
        version: "1.0.0",
        title: "Webshop API Mongo",
        description: "Documentation for webshop API"
    },
    // host: Path and port where your API will start.
    host: config.rootURL,
    // basePath: This is the root of your project.
    basePath: "/",
    // schemes: These are the protocols used.
    schemes: [httpType]
};

const options = {
    explorer: true,
    swaggerOptions: {
        urls: [
        {
            url: `${httpType}://${config.rootURL}/swagger-sql-json`,
            name: 'SQL'
        },
        {
            url: `${httpType}://${config.rootURL}/swagger-mongo-json`,
            name: 'Mongo'
        }
    ]}
}

const swaggerFileSql = require('./sql-docs/swagger_output_sql.json');

const swaggerFileMongo = swaggerJSDoc({swaggerDefinition: swaggerDefinitionMongo, apis: ['./swagger/mongo-docs/*.yaml']});

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, options));

router.get('/swagger-sql-json', (req, res) => {
    console.log("environment", process.env.NODE_ENV);
    console.log("httpType", httpType);
    
    config.isMongoUsed = false;
    MongoDb.closeMongoConnection();

    res.json(swaggerFileSql);
});

router.get('/swagger-mongo-json', (req, res) => {
    console.log("environment", process.env.NODE_ENV);
    console.log("httpType", httpType);
    
    config.isMongoUsed = true;
    
    // Connects to mongo
    MongoDb.createMongoConnection();

    res.json(swaggerFileMongo);
});

module.exports = {
    router,
    swaggerDefinitionMongo,
    options
}