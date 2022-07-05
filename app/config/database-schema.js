// **********************************************************************
//  Purpose: Datebase Schema Constants
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

/*
  This file should be used to name all the schema.
  whenever you need to use the name of schema anywhere
  in the project you should import this constants
*/

const Schema = {
  USER: "users",
  ROLE: "roles",
};
Object.freeze(Schema);
module.exports = { Schema };
