'use strict';

const schema = require('./getHatPatternSchema.json');
const hatPatternHandler = require('./hatPatternHandler');

async function routes(fastify) {
	fastify.post('/knitting/hat/v1', {schema}, async request => {
		return hatPatternHandler.getHatPattern(request);
	});
}

module.exports = routes;