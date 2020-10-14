/*!
* models/users.js
*
* Copyright (c) 2020 Darren Smith
* Licensed under the LGPL license.
*/

;!function(undefined) {

	var model = {}, core = null, service;


	/**
	 * Initialises the model
	 * @param {object} coreObj - The parent core object
	 */
	model.init = function(coreObj){
		core = coreObj;
		service = core.module("services").service("url-shortener");
		return model;
	}

	/**
	 * Get Session Details
	 * @param {object} inputObject - The Input Object
	 * @param {function} cb - Callback Function
	 */
	model.details = function(inputObject, cb){
		var db = service.vars.get("db");
	  	cb(null, {
	  		success: true,
	  		code: "USER_RETRIEVED",
	  		message: "User retrieved successfully",
	  		results: null 
	  	});		
		return;
	}

	/**
	 * (ENTRY POINT FOR EXECUTION)
	 */
	module.exports = model.init;
}();