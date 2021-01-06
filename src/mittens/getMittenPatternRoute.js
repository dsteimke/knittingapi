'use strict';

const schema = require('./getMittenPatternSchema.json');
const mittenPatternHandler = require('./mittenPatternHandler');

async function routes(fastify) {
	fastify.post('/knitting/mitten/v1', {schema}, async (request) => {
		return mittenPatternHandler.getMittenPattern(request);
	});
}

module.exports = routes;
