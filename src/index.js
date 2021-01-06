'use strict';

const fastify = require('./server').createServer();
const start = async () => {
	try {
		await fastify.listen(3000, '::');
		console.log('server listening on 3000');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

start();