// **********************************************************************
//  Purpose: Request Validation Layer
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

const path = require('path');
const { Requests } = require(path.join(__basedir, "app", "common", "Requests"));
const { Response } = require(path.join(__basedir, 'app', 'common', 'Common'));
const { constants, messages } = require(path.join(__basedir, "app", "config"));

const commonValidator = async (req, res, next) => {
    try {
        let url = (req.originalUrl).split("/").pop();
        let requestParams = Requests[url.toUpperCase()];
        if (requestParams) {
            let requestType;
            for (const [key, value] of Object.entries(requestParams)) {
                if (key != 'type') {
                    let reqData = req[requestType];
                    if (checkParamPresent(Object.keys(reqData), key)) {
                        let reqParam = reqData[key];
                        if (!checkParamType(reqParam, value)) {
                            return Response.commonResponse(res, constants.ERROR.BAD_REQUEST, `${key} ${messages.PARAM_TYPE_MISMATCH}`);
                        }
                    } else if (value.required) {
                        return Response.commonResponse(res, constants.ERROR.BAD_REQUEST, `${messages.PARAM_MISSING} ${key}`);
                    }
                } else {
                    requestType = value;
                }
            }
        }
        next();
    } catch (error) {
        return Response.commonResponse(res, constants.ERROR.BAD_REQUEST, messages.ERROR, error);
    }
};

const checkParamPresent = function (paramObj, reqParams) {
    return (paramObj.includes(reqParams));
};

const checkParamType = function (reqParam, paramObj) {
    const reqParamType = typeof reqParam;
    return reqParamType === paramObj.type;
};
module.exports = { commonValidator };
