// **********************************************************************
//  Purpose: API Docs
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************


/**
 * @file swagger.js
 * @summary Configure and initialize swagger
 * @description This file contains swagger configuration and initiates swagger and
 * exposes swagger routes to be used by express app.
 * */

const path = require("path");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { constants } = require(path.join(__basedir, "app", "config"));
const { ENVIRONMENTS } = constants;

let PORT = process.env.PORT;
let ENV = process.env.NODE_ENV || "local"
const environments = {
    local: {
        host: 'localhost:' + PORT,
        schemes: ['http']
    },
    development: {
        host: '',
        schemes: ['https']
    },
};

const swaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'Rest API',
        version: '2.0.0',
        description: 'API to interact with Rest API',
    },
    host: environments[ENV] && environments[ENV].host,
    schemes: environments[ENV] && environments[ENV].schemes,
    basePath: `/${constants.VERSION}`,
    securityDefinitions: {
        JWT: {
            description: "Bearer Token",
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        }
    },
};

let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./app/modules/**/index.js'],
};
const swaggerSpec = swaggerJSDoc(options);
const initiateSwagger = (app) => {
    // Serve swagger docs only for non-production environments
    if (ENV !== ENVIRONMENTS.PRODUCTION) {
        app.get('/api-docs.json', function (req, res) {
            res.send(swaggerSpec);
        });
        app.use('/api-docs', swaggerUi.serveFiles(swaggerSpec));
        app.get('/api-docs', (req, res) => {
            res.send(swaggerUi.generateHTML(swaggerSpec));
        });
    }
};


module.exports = initiateSwagger;