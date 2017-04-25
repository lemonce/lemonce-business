'use strict';

const assert = require('assert');
const _ = require('lodash');
const escape = require('./db').escape;

const dbPattern = /_(.)/g;
/**
 * LAST_TIME => lastTime
 */
function camelize(string) {
	return string.toLowerCase().replace(dbPattern, function (_, char) {
		return char.toUpperCase();
	});
}

exports.camelize = camelize;

const camelPattern = /([A-Z])/g;
/**
 * userId => USER_ID
 */
function toSnake(string) {
	return string.replace(camelPattern, '_$1').toUpperCase();
}

exports.toSnake = toSnake;

/**
 * take an object with snake case keys
 * and return a new object with camel keys
 * also, any Date object with be converted to number
 */
exports.toProp = function (obj) {
	if (typeof obj !== 'object' || Array.isArray(obj)) {
		return obj;
	}

	const keys = Object.keys(obj);
	var out = {};
	var fixedKey;
	var val;

	keys.forEach(function (key) {
		fixedKey = camelize(key);
		val = obj[key];
		out[fixedKey] = val;
	});

	return out;
};

/**
 * the oposite of above
 * take an object with camel case
 * return a new object with snake case keys
 */
exports.toColumn = function (obj) {
	if (typeof obj !== 'object') {
		return obj;
	}

	const keys = Object.keys(obj);
	var out = {};

	keys.forEach(function (key) {
		var fixedKey = toSnake(key);
		out[fixedKey] = obj[key];
	});

	return out;
};

/**
 * take two arrays (1.db column list; 2.mask column)
 * return an array with column keys in snake case
 */
function maskColumn(col, mask) {
	if (mask === undefined) {
		return col;
	}
	// should be like ['LAST_TIME', 'LOGIN']
	const arrayMask = String(mask).split(',').map(toSnake);

	return _.difference(col, arrayMask);
}

exports.maskColumn = maskColumn;

/**
 * same as above with the array joined with ','
 */
exports.maskColumnAndJoinKey = function (col, mask) {
	return maskColumn(col, mask).join(',');
};

/**
 * (object, base column list) =>
 * EMAIL = 'email', `SCHEMAS` = 'schema', LAST_TIME = 123456
 */
exports.joinUpdateSet = function (obj, props) {
	// should be like ['LAST_TIME', 'LOGIN']
	const validKeys = _.intersection(Object.keys(obj).map(toSnake), props);
	var out = [];
	validKeys.forEach(function (key) {
		out.push(key + ' = ' + escape(obj[camelize(key)]));
	});

	return out.join(',');
};

/**
 * (object, base column list) =>
 * (EMAIL, `SCHEMAS`, LAST_TIME)
 * values ('email', 'schema', 123456)
 */
exports.joinInsertSet = function (obj, props) {
	// should be like ['lastTime', 'login']
	const validKeys = _.intersection(Object.keys(obj), props.map(camelize));

	var values = [];
	var escapedVal;
	validKeys.forEach(function (key) {
		escapedVal = escape(obj[key]);
		values.push(escapedVal);
	});
	// schema is mysql keyword
	const keySet = '(' + validKeys.map(key => {
		return toSnake(key);
	}).join(',') + ')';

	return keySet + ' values (' + values.join(',') + ')';
};

/**
 * (111,123, CASE_ID) => (CASE_ID=111 OR CASE_ID=123)
 */
exports.joinWhereSet = function (listQuery, columnName) {
	assert(_.isString(columnName));

	if (_.isString(listQuery)) {
		var out = [];

		listQuery.split(',').map(Number).forEach(function (columnId) {
			out.push(columnName + '=' + escape(columnId));
		});

		return '(' + out.join(' OR ') + ')';
	}

	return '';
};
