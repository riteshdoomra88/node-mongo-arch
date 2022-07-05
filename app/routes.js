// **********************************************************************
//  Purpose: Handling app
//  SN  Date       Change Description      Modified By
//  1   29/03/2022     Base Version        Ritesh
// **********************************************************************

/**
 * @file routes.js
 * @summary Initiate and expose routes
 * */
const fs = require("fs");
const path = require("path");
const modulesPath = path.normalize(path.join(__basedir, "app", "modules"));

const initiateRoutes = (router) => {
  fs.readdirSync(modulesPath).filter(function (file) {
    require(path.join(modulesPath, file))(router);
  });
};

module.exports = initiateRoutes;