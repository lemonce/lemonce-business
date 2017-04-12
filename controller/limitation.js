'use strict';
const extend = require('lodash').assign;
const wrap = require('co-express');
const createError = require('http-errors');
const LimitationModel = require('../model/limitation');
const LicenseController = require('./license');


exports.create = wrap(function * (req, res) {
	const userId = req.session.user.userId;
	const limitation = extend({userId}, req.body);
	yield LimitationModel.create(limitation);
	res.status(200).json({});
});

exports.batchCreate = wrap(function * (req, res) {
	const userId = req.session.user.userId;
	const limitation = extend({userId}, req.body);
	const number = req.params.number;
	for( let i = 0 ; i < number ; i++ ) {
		yield LimitationModel.create(limitation);
	}
	res.status(200).json({});
});

exports.bind = wrap(function * (req, res, next) {
	const limitation = req.body;
	const userId = req.session.user.userId;

	const oldLimitation = yield LimitationModel.findUnbindLimit(userId);
	if(oldLimitation === undefined) {
		return next(createError(404, 'There is no valid product limit for your account.'));
	}

    //请求和license绑定
	const result = yield LicenseController.activate(
		userId, oldLimitation.version, limitation.machineCode, 7200);

	if(!result.success) {
		return next(createError(400, result.msg));
	}

	limitation.activateCode = result.license.activeCode;

	limitation.bindCnt = oldLimitation.bindCnt + 1;
	yield LimitationModel.updateById(oldLimitation.limitId, limitation);

	res.status(200).json(limitation);
});

exports.unBind = wrap(function * (req, res) {
	const limitId = req.params.limitId;
	const limitation = {machineCode: null, bindDate: null};

    //TODO: 请求和license解除绑定
    

	yield LimitationModel.updateById(limitId, limitation);

	res.status(200).json(limitation);
});

exports.update = wrap(function * (req, res) {
	const limitation = req.body;
	const limitId = req.params.limitId;
	yield LimitationModel.updateById(limitId, limitation);
	const newLimitation = yield LimitationModel.findById(limitId);

	res.status(200).json(newLimitation);
});

exports.getList = wrap(function * (req, res) {
	const userId = req.session.user.userId;

	const limitList = yield LimitationModel.findByUser(userId);

	res.status(200).json(limitList);
});

exports.noop = wrap(function * (req, res, next) {
	// const userId = req.body.userId;
	// const license = yield LicenseController.create(userId, 'alpha-0.0.1', 7200);

	// if(!license.success) {
	// 	return next(createError(400, license.msg));
	// }
	res.status(200).json({});
});
