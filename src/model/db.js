'use strict';

const config = require('../../prod.config');
const USER = config.MYSQL_USER;
const PASSWORD = config.MYSQL_PASSWORD;
const DATABASE = config.MYSQL_DATABASE;
const HOST = config.MYSQL_HOST;

const mysql = require('mysql');
const _ = require('lodash');

function genericQuery(query, values) {
	if (values === undefined) {
		values = [];
	}

	return new Promise(function (resolve, reject) {
		const conn = mysql.createConnection({
			host: HOST,
			user: USER,
			password: PASSWORD,
			database: DATABASE,
			charset: 'utf8mb4',
			dateStrings: true
		});

		conn.query(query, values, function (err, rows) {
			if (err) {
				console.error(err.stack);
				reject(err);
			} else {
				resolve(rows);
			}
		});

		conn.end();
	});
}

function joinColumn(obj, props) {
	if (!_.isArray(props)) {
		return Promise.reject('invalid props');
	}
	const validKeys = _.intersection(Object.keys(obj), props);
	var out = [];
	var fixedKey;
	validKeys.forEach(function (key) {
		fixedKey = key === 'SCHEMAS' ? '`SCHEMAS`' : key;
		out.push(fixedKey + ' = ' + mysql.escape(obj[key]));
	});

	return out.join(',');
}

module.exports = {
	escape: mysql.escape,
	joinColumn: joinColumn,
	q: genericQuery
};
