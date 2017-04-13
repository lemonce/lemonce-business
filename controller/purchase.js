'use strict';
const extend = require('lodash').assign;
const wrap = require('co-express');
const PurchaseModal = require('../model/purchase');
const LimitationModel = require('../model/limitation');


exports.create = wrap(function * (req, res) {
	const userId = req.session.user.userId;
	const purchase = extend({userId}, req.body);
	yield PurchaseModal.create(purchase);

    const limitation = yield LimitationModel.findByUser(userId);

    if(limitation === undefined) {
        yield LimitationModel.create({userId});
        limitation = yield LimitationModel.findByUser(userId);
    }

    yield LimitationModel.updateById(limitation.limitId, {
        limitCnt: limitation.limitCnt + parseInt(purchase.limitCnt),
        version: purchase.version
    })
	res.status(200).json({});
});


exports.getList = wrap(function * (req, res) {
	const userId = req.session.user.userId;

	const purchaseList = yield PurchaseModal.findByUser(userId);

	res.status(200).json(purchaseList);
});

