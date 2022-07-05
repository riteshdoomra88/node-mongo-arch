// **********************************************************************
//  Purpose: Express Server
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

/**
 * @file server.js
 * @summary Creates Express server
 * @description This file is responsible for connecting to mongoDB, creating an Express server and adding routes.
 * Server is created by binding express app instance.
 * */

 "use strict";
 global.__basedir = __dirname;
 
 const path = require("path");
 const express = require("express");
 const timeout = require("connect-timeout");
 const cookieParser = require("cookie-parser");
 const { json, urlencoded } = require("body-parser");
 const rateLimit = require('express-rate-limit');
 const { connectToMongoDb } = require(path.join(
   __basedir,
   "app",
   "database",
   "bootstrap",
   "dbConnection"
 ));
 const app = express();
 const router = express.Router();
 const initiateSwagger = require("./swagger");
 const initiateSecurity = require("./security");
 const initiateRoutes = require(path.join(__basedir, "app", "routes"));
 const { constants } = require(path.join(__basedir, "app", "config"));
 
 /* Include Swagger */
 initiateSwagger(app);
 
 /* Manage Request timeout */
 app.use(timeout(120000));
 app.use(haltOnTimedout);
 
 /* Manage JSON Request Handler */
 app.use(urlencoded({ limit: "100mb", extended: true }));
 app.use(json({ limit: "20mb" }));
 app.use(cookieParser());
 
/* Include Security */
initiateSecurity(app);
 
 /* DB Connection Callbacks */
 connectToMongoDb();
 
 /*Invlucde Routes */
 initiateRoutes(router);
 
 /* Rate Limit */
 const limiter = rateLimit({
   windowMs: 1 * 60 * 1000, // 1 minutes
   max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
 });
 
 /* Inclde all routes */
 app.use(`/${constants.VERSION}`, limiter, router);
 
 function haltOnTimedout(req, res, next) {
   if (!req.timedout) next();
 }
 
 module.exports = {
   app,
   router,
 };