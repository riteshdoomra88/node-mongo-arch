// **********************************************************************
//  Purpose: Validator Json
//  SN  Date       Change Description      Modified By
//  1   29/03/2022     Base Version        Ritesh
// **********************************************************************


/* Required : true
   Alternative : option
   Type : body / params / query
*/

const Requests = {
    LOGIN: {
        type: 'body',
        email:{
            required:true,
            type: 'string',
        },
        password:{
            required:true,
            type: 'string',
        }
    },
};

module.exports = {
    Requests
};