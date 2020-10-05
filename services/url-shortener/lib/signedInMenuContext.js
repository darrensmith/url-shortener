/*!
* lib/signedInMenuContext.js
*
* Copyright (c) 2020 Darren Smith
* Licensed under the LGPL license.
*/

;!function(undefined) {

	/**
	 * Main Method
	 * @param {object} session - Session Object
	 * @param {object} context - Context Object
	 */
	var output = function(isnode, session, context){
		if(session.authorised) {
			context.showRegister = false;
			context.showSignIn = false;
			context.showSignOut = true;
			context.showNavOrganisations = true;
			context.showMenu = true;
			context.permissions = session.permissions;
			if(session.organisation) { context.organisation = session.organisation; }
			if(session.orgId) { context.showOrgGoUp = true; context.orgId = session.orgId }
			if(session.userId) { context.userId = session.userId }
			if(session.permissions.admin) { context.showNavAdmin = true; }
			if(session.userName) { context.userName = session.userName; }
			if(session.authorised) { context.authorised = true; }
		}
		context.clientLinks = isnode.globals.get("clientLinks");
		return context;
	}

	module.exports = output;
}();