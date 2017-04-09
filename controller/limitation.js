'use strict';
const extend = require('lodash').assign;
const wrap = require('co-express');
const LimitationModel = require('../model/limitation');


const formatDate = function(date) {
	return date.setHours(date.getHours() + 8);
};

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

exports.bind = wrap(function * (req, res) {
	const limitation = req.body;
	const limitId = req.params.limitId;

    //TODO: 请求和license绑定

	const oldLimitation = yield LimitationModel.findById(limitId);
	limitation.bindCnt = oldLimitation.bindCnt + 1;
	yield LimitationModel.updateById(limitId, limitation);

	res.status(200).json(limitation);
});

exports.unBind = wrap(function * (req, res) {
	const limitId = req.params.limitId;
	const limitation = {machineCode: null};
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

