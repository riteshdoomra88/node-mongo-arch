// **********************************************************************
//  Purpose: Handling Server
//  SN  Date       Change Description      Modified By
//  1   29/03/2022     Base Version        Ritesh
// **********************************************************************

/**
 * @file connection.js
 * @summary Exposes method for connecting to mongoDB
 * */
 const mongoose = require("mongoose");
 const fs = require("fs");
 const path = require("path");
 const { constants, messages } = require(path.join(__basedir, 'app','config'));
 const modelPath = path.normalize(path.join(__basedir, 'app','database','models'));
 const { MONGO_URI } = constants;
 const dbConnection = {}, db = {};

/**
 * Method for connecting to mongoDB
 * */

const connectToMongoDb = async () => {
    mongoose.connection.on("connected", () => {
        console.log(`${messages.MONGODB_CONNECTED}`);
    });
    mongoose.connection.on("error", (err) => {
        console.log(`${messages.MONGODB_CONNECTION_ERROR}: ${err}`);
    });
    mongoose.connection.on("disconnected", () => {
        console.log(`${messages.MONGODB_DISCONNECTED}`);
    });

    let connect = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // loop through all files in models directory

    let modelData = fs.readdirSync(modelPath);
    for (const file of modelData) {
        let modelNames = file.split('.');
        const model = connect.model(modelNames[0], require(path.join(modelPath, file)));
        db[model.collection.collectionName] = model;
    }
    dbConnection.dbInstance = db;
};

module.exports = {
    connectToMongoDb,
    dbConnection
};