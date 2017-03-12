'use strict'

const Logs = require('../models/log.js');
const examplePlugin = require('../plugins/examplePlugin.js');

exports.register = function (server, options, next) {

	server.route({
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			let log = new Logs.Log(request.path, request.id);
			server.log(['hapiService', '/hapi-service/example/'], JSON.stringify(log));
			const response = examplePlugin.myFunction();
			reply(response);
		}
	});

	next();
};

exports.register.attributes = {
	name: 'example',
	version: '1.0.0'
};