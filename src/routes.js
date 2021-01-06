'use strict';

const validation = require('./validation');

async function registerRoutes (fastify) {
  fastify.register(async fastify => {
  	// Ensure the data the user passed in is usable
  	// fastify.addHook('preHandler', validation.validateUserInput);
	  fastify.addHook('preValidation', (request, reply, next) => {
		  validation.validateUserInput(request)
		  next();
	  });
	fastify.addHook('preHandler', (request, reply, next) => {
		validation.validateUserInput(request)
		next();
	});
  	fastify.register(require('./gloves/getGlovesPatternRoute'));
  	fastify.register(require('./mittens/getMittenPatternRoute'));
  	fastify.register(require('./hat/getHatPatternRoute'));
  	fastify.register(require('./socks/getSockPatternRoute'));
  	fastify.register(require('./sweater/getSweaterPatternRoute'));
  });
}

module.exports = {
	registerRoutes: registerRoutes
};