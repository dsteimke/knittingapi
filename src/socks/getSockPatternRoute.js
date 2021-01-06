'use strict';

const schema = require('./getSockPatternSchema.json');
const sockPatternHandler = require('./sockPatternHandler');

async function routes(fastify) {
	fastify.post('/knitting/sock/v1', {schema}, async request => {
		return sockPatternHandler.getSockPattern(request);
	});
}

module.exports = routes;