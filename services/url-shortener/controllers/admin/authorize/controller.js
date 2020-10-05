/*!
* controllers/admin/authorize/controller.js
*
* Copyright (c) 2020 Darren Smith
* Licensed under the LGPL license.
*/

;!function(undefined) {

	var ctrl = {};

	/**
	 * GET
	 * @param {object} req - Request object
	 * @param {object} res - Response object
	 */
	ctrl.get = function BRAppURLShortenerAuthorizeCtrlGet(req, res){
		res.send({});
	}

	/**
	 * (ENTRY POINT FOR EXECUTION)
	 */
	module.exports = ctrl;
}();