// **********************************************************************
//  Purpose: User Operation Layer
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

const path = require('path');
const { Schema } = require(path.join(__basedir, 'app', 'config'));
const { Base } = require('./Base');
class User extends Base {
    constructor() {
        super()
        this._modelName = Schema.USER;
        super.initialize(this)
    }

    /**
     * Returns all the user from database.
     *
     *
     * @since      1.0.0
     * @access     public
     *
     *
     * @alias    getUserData
     * @memberof UserClass
     *
     * @param offset sets the offset
     * @param limit sets the limit
     * @return {Promise} Transactions Data
     */
    async getUserData(fieldKey, fieldValue) {
        let query = (fieldKey) ? { [fieldKey]: fieldValue } : {};
        return await this._getOne(query);
    }

    async getData (limit = 10, offset = 0) {
        return await this._get(false,false,false,false,limit);
      }
    
      async insertData (data) {
        return await this._create(data);
      }

}

module.exports = new User()