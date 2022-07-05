// **********************************************************************
//  Purpose: User Service Layer
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

/**
 * @file user.service.js
 * @summary User Service
 * @description This file contains business logics for user controller.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */
 const path = require('path');
 const User = require(path.join(__basedir, 'app', 'database', 'operations', 'User'));
 const ObjectId = require('mongodb').ObjectID;
 
 const dummyData = async () => {
    //This is just sample, please avoid using any hardcoded ID
     let data = {
         email:"abc@xyz.com",
         roleId:ObjectId('1234abcd678')
     }
     return await User.insertData(data);
 };
 
 module.exports = { dummyData };