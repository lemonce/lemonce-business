const {resolve} = require('path');
module.exports = {
	// production or dev
	NODE_ENV: 'dev',

	// database connection
	MYSQL_USER: 'root',
	MYSQL_PASSWORD: '',
	MYSQL_DATABASE: 'lemonce',
	MYSQL_HOST: '127.0.0.1',

	// http port
	PORT: 8081,
	SERVER_HOST: 'http://localhost:8081',

	// session store location
	SESSION_STORE: resolve(__dirname, 'sessions'),
	FAVICON: resolve(__dirname, 'public/favicon.ico'),
	LOG_FILE: resolve(__dirname, 'error.log'),

	// https port
	SSLPORT: 8082,
	KEY: resolve(__dirname, 'cert/private.pem'),
	CERTIFICATE: resolve(__dirname, 'cert/file.crt'),
	REDIRECT_TO_HTTPS: false,

	// url for license server
	LICENSE_SERVER: 'http://139.129.225.83:8080/license',
	LICENSE_ACTIVATE_PERIOD: 7200,

	// email account
	EMAIL_SERVICE: 'QQ',
	EMAIL_AUTH_USER: '46922547@qq.com',
	EMAIL_AUTH_PASSWORD: 'xvxrdpjmqsrqbicd',
	EMAIL_SENDER_ADDRESS: 'Lemonce <46922547@qq.com>',

	// page info
	PAGE_TITLE: 'Lemonce-Business',
	PAGE_DESCRIPTION: 'lemonce-business',
	PAGE_KEYWORDS: ['lemonce', 'license']
};
