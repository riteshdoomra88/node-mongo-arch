/**
 * @file index.js
 * @summary User routes
 * @description This file contains routes for user entity
 * */
 const path = require('path');
 const { authenticateUserWithToken, checkRoleAccess, commonValidator } = require(path.join(__basedir,"app","middlewares"));
 const { refreshUser, login } = require('./user.controller');
 
 module.exports = router => {
     /**
      * @swagger
      * /users:
      *  get:
      *      tags:
      *          - USERS
      *      security:
      *      - JWT: []
      *      summary: Get all users
      *      description: Returns all users
      *      produces:
      *          - application/json
      *      responses:
      *          200:
      *              description: An array of User Objects
      *              schema:
      *                  type: array
      *                  items:
      *                      $ref: '#/definitions/users'
      *          400:
     *              description: Bad Request
     *          401:
     *              description: Authentication Failed
     *          403:
     *              description: Not Authorized
     *          404:
     *              description: Not Found
     *          500:
     *              description: Internal Error
      *
      */
     router.get("/user-refresh", authenticateUserWithToken, checkRoleAccess, refreshUser);
     router.post("/login", commonValidator, login);
 };

 /**
 * Add model definitions
 * @swagger
 * definitions:
 *  users:
 *      type: object
 *      properties:
 *          _id:
 *              type: string
 *              example: 1233asdad1313
 *          name:
 *              type: string
 *              example: abc
 *          email:
 *              type: string
 *              example: abc@def.com
 */