'use strict';

function createServer() {
	const fastify = require('fastify')({
  		logger: true
	});

	const cors = require('./cors');
	fastify.register(require('fastify-cors'), cors);

	require('./routes').registerRoutes(fastify);
	return fastify;
}

module.exports = {
	createServer: createServer
};
