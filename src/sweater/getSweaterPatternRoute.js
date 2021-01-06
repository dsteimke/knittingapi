'use strict';

// Schemas are used both for the request and the response to speed up the JSON serialization
const schema = require('./getSweaterPatternSchema.json');
const sweaterPatternHandler = require('./sweaterPatternHandler');

async function routes(fastify) {
	fastify.post('/knitting/sweater/v1', {schema}, async request => {
		return sweaterPatternHandler.getSweaterPattern(request);
	});

}

module.exports = routes;