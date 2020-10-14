/*!
* controllers/controller.js
*
* Copyright (c) 2020 Darren Smith
* Licensed under the LGPL license.
*/

;!function(undefined) {

	var ctrl = {}, core, log, service;

	/**
	 * Initialises the controller
	 * @param {object} coreObj - The parent core object
	 */
	ctrl.init = function BRAppURLShortenerRootCtrlInit(coreObj){
		var serviceName = "url-shortener";
		core = coreObj;
		log = core.module("logger").log;
		service = core.module("services").service(serviceName);
		dbLoad();

		/* Load Data Models */
		service.models.add("sessions", require("../models/sessions.js")(core));
		service.models.add("users", require("../models/users.js")(core));
		service.models.add("urls", require("../models/urls.js")(core));
		service.vars.set("signedInMenuContext", require("../lib/signedInMenuContext.js"));
		service.vars.set("uniqueIdentifiers", require("../lib/uniqueIdentifiers.js"));
		service.vars.set("pageBar", require("../lib/pageBar.js"));
		service.vars.set("alerts", require("../lib/alerts.js"));

		/* Session Context Middleware */
		service.use(function(req, res, next) {
			req.log = log;
			var sessionModel = service.models.get("sessions");
			if(req.headers.authorization) {
				var authHeader = req.headers.authorization;
				authHeader = authHeader.split(" ");
				var inputObject = { accessToken: authHeader[1] };
			} else if (req.cookies.sessionToken) {
				var inputObject = { sessionToken: req.cookies.sessionToken };
			} else {
				var inputObject = {};
			}
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			inputObject.excludeDeleted = true;
			sessionModel.details(inputObject, function(sessionErr, session) {
				if(session && session.data)
					req.session = session.data;
				else
					req.session = { authorised: false };
				req.auth = {};
				var checkPermissions = function(permArr) {
					if(permArr.length == 0 && req.session.authorised == true) {
						return true;
					} else if (permArr.length > 0 && req.session.authorised == true) {
						var counter = 0;
						for (var i = 0; i < permArr.length; i++) {
							if(permArr[i] in req.session.permissions) {
								counter ++;
							}
						}
						if(counter >= permArr.length) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}					
				}
				req.auth.web = function(permArr, cb) {
					var checkResult = checkPermissions(permArr);
					if(checkResult) { cb(); }
					else { res.redirect("/web?message=failure&code=NOT_AUTHORISED"); }
				};
				req.auth.api = function(permArr, cb) {
					var checkResult = checkPermissions(permArr);
					if(checkResult) { cb(); }
					else { res.send({error: "Not Authorised"}); }
				};
				next();
			});
		});
		return;
	}

	var dbLoad = function BRAppURLShortenerRootCtrlDbLoad(){
		var db = require("../db/db.json");
		var dbReady = {};
		for (var table in db) {
			if(!dbReady[table]) { dbReady[table] = {} }
			for (var i = 0; i < db[table].length; i++) {
				if(table == "users") { dbReady[table][db[table][i].email] = db[table][i]; }
				else if(table == "urls") { dbReady[table][db[table][i].path] = db[table][i]; }
			}
		}
		service.vars.set("db", dbReady);
	}

	/**
	 * GET
	 * @param {object} req - Request object
	 * @param {object} res - Response object
	 */
	ctrl.get = function BRAppURLShortenerRootCtrlGet(req, res){
		var urlModel = service.models.get("urls");
		urlModel.details({ path: req.path }, function(urlErr, urlRes) {
			if(urlRes && urlRes.result && urlRes.result.action == "302" && urlRes.result.target) {
				res.redirect(urlRes.result.target);
			} else if (urlRes && urlRes.result && urlRes.result.action == "capture" && urlRes.result.target) {
				res.render("general/download.mustache");
			} else {
				res.redirect("https://www.darrensmith.com.au");
			}
		});
	}

	/**
	 * POST
	 * @param {object} req - Request object
	 * @param {object} res - Response object
	 */
	ctrl.post = function BRAppURLShortenerRootCtrlPost(req, res){
		var urlModel = service.models.get("urls");
		if(req.body.emailAddress && req.body.fullName) {
			urlModel.details({ path: req.path }, function(urlErr, urlRes) {
				var fs = require("fs"), newLine = req.body.emailAddress + "," + req.body.fullName + "," + req.path + "," + urlRes.result.target + "\n";
				fs.appendFile("/opt/daz.to/users/" + req.body.emailAddress + ".csv", newLine, function(err, result) {
					if(urlRes && urlRes.result && urlRes.result.action == "capture" && urlRes.result.target) {
						res.redirect(urlRes.result.target);
					} else {
						res.redirect("https://www.darrensmith.com.au");
					}
				});
			});
		} else {
			res.redirect(req.originalUrl + "?error=INVALID_DETAILS");
		}
	}

	/**
	 * (ENTRY POINT FOR EXECUTION)
	 */
	module.exports = ctrl;
}();