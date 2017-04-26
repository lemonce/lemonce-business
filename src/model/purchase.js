'use strict';
const map = require('./map');
const db = require('./db');

const PURCHASE_TABLE = 'biz_purchase';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'PURCHASE_ID', 'EMAIL', 'PRODUCT_ID', 'PURCHASE_TIME', 
	'PURCHASE_COMPLETE_TIME', 'PURCHASE_STATUS', 'INVOICE_NUMBER'
];

const BaseWriteList = [
	'PURCHASE_ID', 'EMAIL', 'PRODUCT_ID', 'PURCHASE_TIME', 
	'PURCHASE_COMPLETE_TIME', 'PURCHASE_STATUS', 'INVOICE_NUMBER'
];
const PurchaseModel = {
	create: function (purchase) {
		const insertQuery = joinInsertSet(purchase, BaseWriteList);

		return db.q(`insert into ${PURCHASE_TABLE}${insertQuery}`);
	},
	findById: function (purchaseId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${PURCHASE_TABLE}
				WHERE PURCHASE_ID = ${purchaseId}`)
			.then(rows => toProp(rows[0]));
	},
	updateById: function (purchaseId, purchase) {
		const updateQuery = joinUpdateSet(purchase, BaseWriteList);

		return db.q(`update ${PURCHASE_TABLE} SET ${updateQuery}
				WHERE PURCHASE_ID = ${purchaseId}`);
	}
	
};

module.exports = PurchaseModel;
