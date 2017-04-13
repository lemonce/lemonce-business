'use strict';
const wrap = require('co-express');
const createError = require('http-errors');
const LimitationModel = require('../model/limitation');
const LicenseModel = require('../model/license');
const LicenseServer = require('../model/license-server');

exports.bind = wrap(function * (req, res, next) {
	const userId = req.session.user.userId;
	const machineCode = req.body.machineCode;

	const limitation = yield LimitationModel.findByUser(userId);
	const bindCnt = yield LicenseModel.findCnt('userId', userId);

	if(!limitation || limitation.limitCnt <= bindCnt) {
		return next(createError(404, 'There is no valid product limit for your account.'));
	}

    //请求和license绑定
	const result = yield LicenseServer.activate(
		userId, limitation.version, machineCode, 7200);

	if(!result.success) {
		return next(createError(400, result.msg));
	}

	yield LicenseModel.create({userId, licenseId: result.license.id});

	res.status(200).json({});
});

exports.unBind = wrap(function * (req, res, next) {
	const licenseId = req.params.licenseId;

    //请求和license解除绑定,
    const result = yield LicenseServer.delete(licenseId);

	if(!result.success) {
		return next(createError(400, result.msg));
	}

	yield LicenseModel.deleteById(licenseId);

	res.status(200).json({});
});

exports.update = wrap(function * (req, res) {
	const limitation = req.body;
	const limitId = req.params.limitId;
	yield LimitationModel.updateById(limitId, limitation);
	const newLimitation = yield LimitationModel.findById(limitId);

	res.status(200).json(newLimitation);
});

exports.getLimitation = wrap(function * (req, res) {
	const userId = req.session.user.userId;

	const limit = yield LimitationModel.findByUser(userId);
	limit.bindCnt = yield LicenseModel.findCnt('userId', userId);

	res.status(200).json(limit);
});

exports.getBindList = wrap(function * (req, res, next) {
	const userId = req.session.user.userId;

	const result = yield LicenseServer.getListByUser(userId);
	if(!result.success) {
		return next(createError(400, result.msg));
	}

	res.status(200).json(result.licenses);
});

exports.noop = wrap(function * (req, res, next) {
	// const userId = req.body.userId;
	// const license = yield LicenseController.create(userId, 'alpha-0.0.1', 7200);

	// if(!license.success) {
	// 	return next(createError(400, license.msg));
	// }
	res.status(200).json({});
});
