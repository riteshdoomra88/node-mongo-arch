// **********************************************************************
//  Purpose: Configuration & Constants
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

/**
 * @file constants.js
 * @summary Contains constants for app
 * @description This file defines constant variables used by app. It also reads .env file and merges it with
 * our defined constants
 * */

const { config } = require("dotenv");

const dotEnv = config();

if (dotEnv.error) {
    throw dotEnv.error;
}

const {
    PORT,
    ENV,
    MONGO_URI,
} = process.env;

const constants = {
    PORT,
    ENV,
    MONGO_URI,
    VERSION: "v1",
    SECRET: "jwtsecret",
    TOKEN_VALIDITY: "7 days",
    ENVIRONMENTS: {
        DEVELOPMENT: "development",
        PRODUCTION: "production"
    },
    LOG_CONFIG: {
        DATE_PATTERN: "YYYY-MM-DD",
        MAX_FILE: "30d"
    },
    SUCCESS: 200,
    ERROR: {
        BAD_REQUEST: 400,
        UNAUTHENTICATED: 401,
        UNAUTHORIZED: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
};

module.exports = {
    constants
};
