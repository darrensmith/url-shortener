/*!
* models/urls.js
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
		if(db.urls[inputObject.path]) {
		  	cb(null, {
		  		success: true,
		  		code: "URL_RETRIEVED",
		  		message: "URL retrieved successfully",
		  		result: db.urls[inputObject.path] 
		  	});				
		  } else {
		  	cb({
		  		success: false,
		  		code: "URL_RETRIEVAL_FAILED",
		  		message: "URL retrieval failed"
		  	}, null);	
		  }
	}

	/**
	 * (ENTRY POINT FOR EXECUTION)
	 */
	module.exports = model.init;
}();