'use strict';

const glovePatternHandler = require('./glovePatternHandler');

async function routes(fastify) {
	fastify.post('/knitting/gloves/v1', {}, async request => {
		return glovePatternHandler.getGlovePattern(request);
	});
}

module.exports = routes;