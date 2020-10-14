/*!
* controllers/admin/controller.js
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
	ctrl.get = function BRAppURLShortenerAdminCtrlGet(req, res){
		var context = { showRegister: true, showSignIn: true, showSignOut: false, showMenu: false };	
		if(req.session.authorised == true) {
			context = req.service.vars.get("signedInMenuContext")(req.core, req.session, context);
			res.render("general/home.mustache", context);
		} else {
			context = req.service.vars.get("signedInMenuContext")(req.core, {}, context);
			res.render("general/home.mustache", context);
		}
	}

	/**
	 * (ENTRY POINT FOR EXECUTION)
	 */
	module.exports = ctrl;
}();