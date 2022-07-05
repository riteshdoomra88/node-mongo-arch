// **********************************************************************
//  Purpose: User Controller Layer
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************


/**
 * @file user.controller.js
 * @summary User controllers
 * @description This file contains controller definition for user entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */
 const path = require('path');
 const { createToken } = require(path.join(__basedir,"app","middlewares"));
 const { Response } = require(path.join(__basedir, 'app','common','Common'));
 const { constants, messages } = require(path.join(__basedir, 'app','config'));
 const User = require(path.join(__basedir, 'app','database','operations','User'));
 
 const { SUCCESS, ERROR } = constants;
 
 /**
  * Controller to get user data by id
  * @param {object} req HTTP request object
  * @param {object} res HTTP response object
  * @param {function} next next method
  * */
 const refreshUser = async (req, res, next) => {
    try {
       let user = await User.getUserData('_id',req.currentUser._id);
        Response.commonResponse(res, SUCCESS, messages.DATA_FOUND, user);
        next();
    } catch (error) {
        console.log(`${messages.ERROR_USER}: `, error);
        return Response.commonResponse(res, ERROR.INTERNAL_SERVER_ERROR, messages.ERROR, error )
    }
};

const login = async (req, res, next) => {
    try {
       let user = await User.getUserData('_id',req.currentUser._id);
       const token = await createToken({ userId: user._id});
        Response.commonResponse(res, SUCCESS, messages.DATA_FOUND, {user, token});
        next();
    } catch (error) {
        console.log(`${messages.ERROR_USER}: `, error);
        return Response.commonResponse(res, ERROR.INTERNAL_SERVER_ERROR, messages.ERROR, error )
    }
};

const saveData = async (req, res, next) => {
    try {
        await dummyData();
        Response.commonResponse(res, SUCCESS, messages.DATA_SAVED);
        next();
    } catch (error) {
        console.log(`${messages.ERROR_SALES}: `, error);
        return Response.commonResponse(res, ERROR.INTERNAL_SERVER_ERROR, messages.ERROR, error);
    }
}

 module.exports = {
    refreshUser,
    login,
    saveData
};