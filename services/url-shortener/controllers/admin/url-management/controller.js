/*!
* controllers/admin/url-management/controller.js
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
	ctrl.get = function BRAppURLShortenerUrlMgmtCtrlGet(req, res){
		req.auth.web([], function() {
			var context = req.service.vars.get("signedInMenuContext")(req.core, req.session, {});
			res.render("url-management/url-management.mustache", context);
			return;
		});
	}

	/**
	 * (ENTRY POINT FOR EXECUTION)
	 */
	module.exports = ctrl;
}();