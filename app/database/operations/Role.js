// **********************************************************************
//  Purpose: Role Operation Layer
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************


const path = require('path');
const { Schema } = require(path.join(__basedir, 'app','config'));
const { Base } = require('./Base');
class Role extends Base {
  constructor () {
    super()
    this._modelName = Schema.ROLE;
    super.initialize(this)
  }

  /**
   * Returns all the transactions from database.
   *
   *
   * @since      1.0.0
   * @access     public
   *
   *
   * @alias    getAdminRole
   * @memberof RoleClass
   *
   * @param offset sets the offset
   * @param limit sets the limit
   * @return {Promise} Transactions Data
   */
  async getAdminRole(){
    return await this._getOne({'role': 'admin'});
  }

}

module.exports = new Role()