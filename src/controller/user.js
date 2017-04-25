'use strict';
const createError = require('http-errors');
const wrap = require('co-express');
const svgCaptcha = require('svg-captcha');
const UserModel = require('../model/user');
const SummaryModel = require('../model/summary');


exports.login = wrap(function * (req, res, next) {
	const username = req.body.username;
	const pw = req.body.password;
	if (!username || !pw) {
		return next(createError(404, 'Invalid Information.'));
	}

	const user = yield UserModel.search(username, pw);
	if (user === undefined) {
		return next(createError(404, 'Invalid username or password.'));
	}

	req.session.user = user;
	res.status(200).json(user);
});

exports.create = wrap(function * (req, res, next) {
	req.checkBody(UserModel.bodyChecker);
	const errors = req.validationErrors();
	if (errors) {
		return next(createError(400, 'Invalid parameter.'));
	}

	const user = req.body;

	if(req.session.captcha !== user.captcha) {
		return next(createError(400, 'Incorrect Captcha.'));
	}

	const exist = yield UserModel.isExist('username', user.username);
	if(exist) {
		return next(createError(400, 'Username Already Exists.'));
	}

	const userId = yield UserModel.create(user);
	const result = yield UserModel.findById(userId);
	yield SummaryModel.create({userId});
	
	req.session.user = result;

	res.status(200).json(result);
});

exports.logout = function (req, res) {
	req.session.destroy();

	res.status(200).json({});
};

exports.info = function (req, res) {
	res.status(200).json(req.session.user);
};

exports.update = wrap(function * (req, res) {
	const user = req.body;
	const userId = req.session.user.userId;
	yield UserModel.updateById(userId, user);

	const newUser = yield UserModel.findById(userId);
	req.session.user = newUser;
	res.status(200).json(newUser);
});

exports.isExisted = wrap(function * (req, res) {
	const type = req.params.type;
	const value = req.params.value;

	const exist = yield UserModel.isExist(type, value);

	res.status(200).json({isExisted: exist});
});

exports.changePassword = wrap(function * (req, res, next) {
	const oldPwd = req.body.password;
	const newPwd = req.body.newpassword;
	const user = req.session.user;

	if(!(yield UserModel.search(user.username, oldPwd))) {
		return next(createError(404, 'Incorrect Password.'));
	}

	user.password = newPwd;
	yield UserModel.updateById(user.userId, user);

	res.status(200).json({});
});


exports.captcha = function (req, res) {
	const c = svgCaptcha.create();
	req.session.captcha = c.text.toLowerCase();

	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(c.data);
};

