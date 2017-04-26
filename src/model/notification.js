'use strict';
const map = require('./map');
const db = require('./db');

const NOTIFICATION_TABLE = 'biz_notification';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'NOTIFICATION_ID', 'PURCHASE_ID', 'TYPE_NAME', 'RAW'
];

const BaseWriteList = [
	'PURCHASE_ID', 'TYPE_NAME', 'RAW'
];
const NotificationModel = {
	findById: function (notificationId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${NOTIFICATION_TABLE}
				WHERE NOTIFICATION_ID = ${notificationId}`)
			.then(rows => toProp(rows[0]));
	},
	findByPurchaseId: function (purchaseId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${NOTIFICATION_TABLE}
				WHERE PURCHASE_ID = ${purchaseId}`)
			.then(function (rows) {
				return rows.map(toProp);
			});
	},
	updateById: function (notificationId, notification) {
		const updateQuery = joinUpdateSet(notification, BaseWriteList);

		return db.q(`update ${NOTIFICATION_TABLE} SET ${updateQuery}
				WHERE NOTIFICATION_ID = ${notificationId}`);
	},
	create: function (notification) {
		const insertQuery = joinInsertSet(notification, BaseWriteList);

		return db.q(`insert into ${NOTIFICATION_TABLE}${insertQuery}`);
	}
};

module.exports = NotificationModel;
