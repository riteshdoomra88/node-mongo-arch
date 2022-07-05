// **********************************************************************
//  Purpose: Common File
//  SN  Date       Change Description      Modified By
//  1   31/03/2022     Base Version        Ritesh
// **********************************************************************

class Response {
  /**
   * Returns common standard for post/get request.
   *
   * Add status, message with response.
   *
   * @since   1.0.0
   * @access  public
   *
   *
   * @alias    commonResponse
   * @memberof CommonClass
   *
   *
   * @return {Json} status, message and response
   * @param {Object} res for http response
   * @param {Number} status for http response code
   * @param {String} message for http response message
   * @param {Object} responseData for http response data
   * @param [instance]
   */
  static commonResponse (res, status, message, responseData = null) {
    return res.status(status).send({
      'status': status,
      'message': message,
      'response': responseData || []
    })
  }
}

module.exports = { Response }
