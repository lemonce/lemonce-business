'use strict';
const map = require('./map');
const db = require('./db');

const LIMITATION_TABLE = 'biz_limitation';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'LIMIT_ID', 'USER_ID', 'PURCHASE_DATE', 'LIMIT_COUNT', 'VERSION'
];

const BaseWriteList = [
	'USER_ID', 'PURCHASE_DATE', 'LIMIT_COUNT', 'VERSION'
];
const LimitationModel = {

	findById: function (limitId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${LIMITATION_TABLE}
				WHERE LIMIT_ID = ${limitId}`)
			.then(rows => toProp(rows[0]));
	},
	findByUser: function (userId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${LIMITATION_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(function (rows) {
				return rows.map(toProp);
			});
	},
	updateById: function (limitId, limitation) {
		const updateQuery = joinUpdateSet(limitation, BaseWriteList);

		return db.q(`update ${LIMITATION_TABLE} SET ${updateQuery}
				WHERE LIMIT_ID = ${limitId}`);
	},
	create: function (limitation) {
		const insertQuery = joinInsertSet(limitation, BaseWriteList);

		return db.q(`insert into ${LIMITATION_TABLE}${insertQuery}`);
	}
};

module.exports = LimitationModel;