#!/usr/bin/env node
'use strict';

// const fs = require('fs');
const http = require('http');
// const https = require('https');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const validator = require('express-validator');

const FileStore = require('session-file-store')(session);

const app = express();
const httpServer = http.createServer(app);
// const redirectApp = express();

/**
 * load environment variable first
 */
require('dotenv').load();

/**
 * configuration and router
 */
const routes = require('./routes');
// const config = require('./config');

// config(app);
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

app.set('port', process.env.PORT || 8081);
app.set('sslport', process.env.SSLPORT || 443);
httpServer.listen(app.get('port'), function (err) {
	if (err) {
		throw err;
	}

	console.log('Server is running on port: ' + app.get('port'));
});

/**
 * redirect the user to https
 */
// redirectApp.get('*', (req, res) =>
// 	res.redirect(`https://${req.headers.host}${req.url}`));
// redirectApp.listen(80);

/**
 * https server
 */
// try {
// 	const options = {
// 		key: fs.readFileSync('./cert/.key'),
// 		cert: fs.readFileSync('./cert/.pem')
// 	};
// 	const httpsServer = https.createServer(options, app);
// 	httpsServer.listen(app.get('sslport'), function (err) {
// 		if (err) {
// 			throw err;
// 		}

// 		console.log('Server is running on port: ' + app.get('sslport'));
// 	});
// } catch (err) {
// 	console.log('NO~~~ https');
// }

module.exports = app;
