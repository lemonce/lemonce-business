'use strict';
const createError = require('http-errors');
const extend = require('lodash').assign;
const wrap = require('co-express');
const SummaryModel = require('../model/summary');
const LimitationModel = require('../model/limitation');
const LicenseModel = require('../model/license');
const LicenseServer = require('../model/license-server');

exports.create = wrap(function * (req, res) {
	const userId = req.session.user.userId;
	const limitation = extend({userId}, req.body);
	yield LimitationModel.create(limitation);
	res.status(200).json({});
});


exports.getList = wrap(function * (req, res) {
	const userId = req.session.user.userId;

	const limitationList = yield LimitationModel.findByUser(userId);

	res.status(200).json(limitationList);
});

exports.bind = wrap(function * (req, res, next) {
	const userId = req.session.user.userId;
	const machineCode = req.body.machineCode;

	const summary = yield SummaryModel.findByUser(userId);
	const bindNumber = yield LicenseModel.findCount('userId', userId);

	if(!summary || summary.limitationNumber <= bindNumber) {
		return next(createError(401, 'There is no valid product limit for your account.'));
	}

    //请求和license绑定
	const result = yield LicenseServer.activate(
		userId, summary.version, machineCode);

	if(!result.success) {
		return next(createError(400, result.msg));
	}

	yield LicenseModel.create({userId, licenseId: result.license.code});

	res.status(200).json({});
});

exports.unBind = wrap(function * (req, res, next) {
	const code = req.params.code;

    //请求和license解除绑定,
	const result = yield LicenseServer.delete(code);

	if(!result.success) {
		return next(createError(400, result.msg));
	}

	yield LicenseModel.deleteById(code);

	res.status(200).json({});
});


exports.updateSummary = wrap(function * (req, res) {
	const limitation = req.body;
	const summaryId = req.params.limitationId;
	yield SummaryModel.updateById(summaryId, limitation);
	const newSummary = yield SummaryModel.findById(summaryId);

	res.status(200).json(newSummary);
});


exports.getSummary = wrap(function * (req, res) {
	const userId = req.session.user.userId;

	const summary = yield SummaryModel.findByUser(userId);
	summary.bindNumber = yield LicenseModel.findCount('userId', userId);

	res.status(200).json(summary);
});

exports.getBindList = wrap(function * (req, res, next) {
	const userId = req.session.user.userId;

	const result = yield LicenseServer.getListByUser(userId);
	if(!result.success) {
		return next(createError(400, result.msg));
	}

	const bindLicenses = yield LicenseModel.findByUser(userId);

	const bindList = result.license && result.license.filter(license => {
		for( let obj of bindLicenses) {
			if(obj.licenseId === license.code) return true;
		}
		return false;
	});

	res.status(200).json(bindList);
});
