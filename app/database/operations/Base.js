// **********************************************************************
//  Purpose: Base File
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

const path = require('path');
const { dbConnection } = require(path.join(__basedir, 'app','database', 'bootstrap', 'dbConnection'));

class Base {
  constructor() {
    this.model = null;
  }

  initialize(self) {
    this._modelName = self._modelName;
  }

  /**
* Returns all data of the model from database.
*
* @since      1.0.0
* @access     public
*
* @alias    getAll
* @memberof BaseClass
*
* @param offset sets the offset of SQL
* @param limit sets the limit of SQL
* @param respectBlacklist
* @param attributes
* @param overrides object containing sequelize condition
* @return {Promise} Users Sequelize Instance containing Users
*/

  async _get(_lookup, _unwind, _match, _sort, _limit, _skip) {
    const aggregate = [];
    if (_lookup) {
      const lookup = {
        $lookup: _lookup
      }
      aggregate.push(lookup);
    }
    if (_unwind) {
      const unwind = {
        $unwind: _unwind
      }
      aggregate.push(unwind);
    }
    if (_match) {
      const match = {
        $match: _match
      }
      aggregate.push(match);
    }
    if (_sort) {
      const sort = {
        $sort: _sort
      }
      aggregate.push(sort);
    }
    if (_limit) {
      const limit = {
        $limit: _limit
      }
      aggregate.push(limit);
    }
    if (_skip) {
      const skip = {
        $skip: _skip
      }
      aggregate.push(skip);
    }
    return await dbConnection.dbInstance[this._modelName].aggregate(aggregate);
   
  }

  async _getOne(query){
    return await dbConnection.dbInstance[this._modelName].findOne(query);
  }

  async _create(data){
    let dataInstance = new dbConnection.dbInstance[this._modelName]();
    dataInstance = Object.assign(dataInstance, data);
    return await dataInstance.save();
  }

   // Bulk Create
   async _bulkCreate (fieldsArray) {
    return await dbConnection.dbInstance[this._modelName].bulkCreate(fieldsArray);
  }

  async _update (query, data) {
    return await dbConnection.dbInstance[this._modelName].updateOne(query, { $set: data });
  }

  async _updateMany(query, data){
    return await dbConnection.dbInstance[this._modelName].updateMany(query, { $set: data });
  }

  async _delete (query) {
    return await dbConnection.dbInstance[this._modelName].deleteOne(query);
  }

  async _deleteMany (query) {
    return await dbConnection.dbInstance[this._modelName].deleteMany(query);
  }
}

module.exports.Base = Base;