'use strict';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('../src/routes');
const session = require('express-session');
const validator = require('express-validator');
const FileStore = require('session-file-store')(session);

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(validator());
	app.use(session({
		secret: 't;{~JY5FLum4LgJ`%BO+us9=3Pwo&i#I,?gD$pUL',
		resave: false,
		saveUninitialized: true,
		store: new FileStore({ttl: 60 * 60 * 24, retries: 1}),
		cookie: {httpOnly: true}
	}));
	app.use(routes);
};