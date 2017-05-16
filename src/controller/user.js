'use strict';
const createError = require('http-errors');
const nodemailer = require('nodemailer');
const wrap = require('co-express');
const svgCaptcha = require('svg-captcha');
const DetailModel = require('../model/detail');
const UserModel = require('../model/user');
const ResetModel = require('../model/reset');

exports.login = wrap(function * (req, res, next) {
	const username = req.body.username;
	const pw = req.body.password;
	if (!username || !pw) {
		return next(createError(400, 'Invalid Information.'));
	}

	const user = yield UserModel.search(username, pw);
	if (user === undefined) {
		return next(createError(400, 'Invalid username or password.'));
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

	const existUsername = yield UserModel.isExist('username', user.username);
	const existEmail = yield UserModel.isExist('email', user.email);
	if(existUsername) {
		return next(createError(400, 'Username Already Exists.'));
	}
	if(existEmail) {
		return next(createError(400, 'This email has already been registered.'));
	}

	const userId = yield UserModel.create(user);
	const result = yield UserModel.findById(userId);
	sendConfirmEmail(result.email, result.emailVerifiedCode);

	res.status(200).json({});
});

exports.detail = wrap(function * (req, res) {
	const userId = req.session.user.userId;

	const detail = yield DetailModel.findById(userId);
	res.status(200).json(detail);
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
	const userId = req.params.userId;
	yield UserModel.updateById(userId, user);
	yield DetailModel.updateById(userId, user);

	const newUser = yield UserModel.findById(userId);
	req.session.user = newUser;
	res.status(200).json(newUser);
});

exports.isExisted = wrap(function * (req, res) {
	const type = req.params.type;
	const value = req.params.value;

	const user = yield UserModel.isExist(type, value);

	res.status(200).json({isExisted: user !== undefined});
});

exports.changePassword = wrap(function * (req, res, next) {
	const oldPwd = req.body.password;
	const newPwd = req.body.newpassword;
	const user = req.session.user;

	if(!(yield UserModel.search(user.username, oldPwd))) {
		return next(createError(404, 'Incorrect Password.'));
	}

	yield UserModel.changePassword(user.userId, newPwd);

	res.status(200).json({});
});

exports.verifyEmail = wrap(function * (req, res) {
	const emailVerifiedCode = req.query.eid;
	yield UserModel.verifyEmail(emailVerifiedCode);
	req.session.destroy();
	res.redirect('/');
});

exports.sendVerifyEmail = wrap(function * (req, res) {
	const user = req.session.user;
	yield sendConfirmEmail(user.email, user.emailVerifiedCode);
	res.status(200).json({});
});

exports.captcha = function (req, res) {
	const c = svgCaptcha.create();
	req.session.captcha = c.text.toLowerCase();

	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(c.data);
};

exports.resetEmail = wrap(function * (req, res, next) {
	const email = req.body.email;
	const user = yield UserModel.isExist('email', email);
	if(user === undefined) {
		return next(createError(400, 'Can\'t find that email, sorry.'));
	}
	yield ResetModel.create(user.userId);
	const resetInfo = yield ResetModel.findValid(user.userId);
	sendResetEmail(email, resetInfo.token);
	res.status(200).json({});
});

exports.resetPassword = wrap(function * (req, res, next) {
	const token = req.body.token;
	const password = req.body.password;

	const resetInfo = yield ResetModel.findByToken(token);

	if(resetInfo === undefined) {
		return next(createError(400, 'It looks like you used an invalid password reset link. Please try again.'));
	}

	yield UserModel.changePassword(resetInfo.userId, password);

	res.status(200).json({});
});

function sendConfirmEmail(receiverAddress, verifiedCode) {
	const mailOptions = {
		from: process.env.EMAIL_SENDER_ADDRESS,
		to: receiverAddress,
		subject: '[Lemonce] Lemonce Business Email Confirmation',
		text: `Go to the link to activate your account. ${process.env.SERVER_HOST}/user/verify?eid=${verifiedCode}`
	};
	sendEmail(mailOptions);
}

function sendResetEmail(receiverAddress, token) {
	const mailOptions = {
		from: process.env.EMAIL_SENDER_ADDRESS,
		to: receiverAddress,
		subject: '[Lemonce] Please Reset your password',
		text: `Use the following link within the next 3 days to reset your password. ${process.env.SERVER_HOST}/#/reset_password/${token}`
	};
	sendEmail(mailOptions);
}

function sendEmail(mailOptions) {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_AUTH_USER,
			pass: process.env.EMAIL_AUTH_PASSWORD
		}
	});
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, err => {
			if(err) {
				console.error(err.stack);
				reject(err);
			}
			transporter.close();
			resolve();
		});
	});
}
