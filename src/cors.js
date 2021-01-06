'use strict';

const corsOptions = {
	origin: [
		new RegExp('^^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'),
		'DESKTOP-RIJO8EF'
	],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	allowedHeaders: ['accept', 'accept-language', 'access', 'content-type']
};

module.exports = corsOptions;

