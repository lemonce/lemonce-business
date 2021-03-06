'use strict';

const createError = require('http-errors');
/**
 * use for development and test purpose
 * it will autherize you with a session
 */
exports.dev = function (req, res, next) {
	if (process.env.NODE_ENV === 'development') {
		return next();
	}

	return next(createError(404, 'not found'));
};

exports.requireLogin = function (req, res, next) {
	if (req.session && req.session.user) {
		return next();
	}

	return next(createError(401, '请先登录!'));
};

/**
 * generate a query checker
 */
exports.check = function (kw) {
	return function (req, res, next) {
		if (!(req.query[kw])) {
			return next(createError(400, '没有 ' + kw));
		}

		return next();
	};
};
