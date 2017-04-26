'use strict';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('../src/routes');
const session = require('express-session');
const validator = require('express-validator');
const winston = require('winston');
const FileStore = require('session-file-store')(session);

module.exports = function (app) {
	
	let logOption;
	if(process.env.NODE_ENV === 'production') {
		logOption = {
			stream: {
				write: message => winston.info(message)
			}
		};
		winston.handleExceptions(new winston.transports.File({
			filename: './error.log'
		}));
	}
	app.use(logger('dev', logOption));

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