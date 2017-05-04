'use strict';
const createError = require('http-errors');
const nodemailer = require('nodemailer');
const wrap = require('co-express');
const svgCaptcha = require('svg-captcha');
const UserModel = require('../model/user');

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
	yield sendConfirmEmail(result.email, result.emailVerifiedCode);

	res.status(200).json({});
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

function sendConfirmEmail(receiverAddress, verifiedCode) {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_AUTH_USER,
			pass: process.env.EMAIL_AUTH_PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.EMAIL_SENDER_ADDRESS,
		to: receiverAddress,
		subject: 'Lemonce Business Email Confirmation',
		text: `Go to the link to confirm your email. http://localhost:8081/user/confirm?eid=${verifiedCode}`
	};

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
