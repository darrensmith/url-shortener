/*!
* models/users.js
*
* Copyright (c) 2020 Darren Smith
* Licensed under the LGPL license.
*/

;!function(undefined) {

	var model = {}, isnode = null, service;


	/**
	 * Initialises the model
	 * @param {object} isnodeObj - The parent isnode object
	 */
	model.init = function(isnodeObj){
		isnode = isnodeObj;
		service = isnode.module("services").service("url-shortener");
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