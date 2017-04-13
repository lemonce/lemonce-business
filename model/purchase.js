'use strict';
const map = require('./map');
const db = require('./db');

const PURCHASE_TABLE = 'biz_purchase';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'PURCHASE_ID', 'USER_ID', 'PURCHASE_DATE', 'LIMIT_CNT', 'VERSION'
];

const BaseWriteList = [
	'USER_ID', 'PURCHASE_DATE', 'LIMIT_CNT', 'VERSION'
];
const PurchaseModel = {

	findById: function (purchaseId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${PURCHASE_TABLE}
				WHERE PURCHASE_ID = ${purchaseId}`)
			.then(rows => toProp(rows[0]));
	},
	findByUser: function (userId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${PURCHASE_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(function (rows) {
				return rows.map(toProp);
			});
	},
	updateById: function (purchaseId, purchase) {
		const updateQuery = joinUpdateSet(purchase, BaseWriteList);

		return db.q(`update ${PURCHASE_TABLE} SET ${updateQuery}
				WHERE PURCHASE_ID = ${purchaseId}`);
	},
	create: function (purchase) {
		const insertQuery = joinInsertSet(purchase, BaseWriteList);

		return db.q(`insert into ${PURCHASE_TABLE}${insertQuery}`);
	}
};

module.exports = PurchaseModel;
