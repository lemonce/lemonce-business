'use strict';
const map = require('./map');
const db = require('./db');

const LIMITATION_TABLE = 'biz_limitation';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'LIMITATION_ID', 'USER_ID', 'CREATE_TIME', 'INCREMENT', 'PURCHASE_ID', 'ACTIVED'
];

const BaseWriteList = [
	'USER_ID', 'INCREMENT', 'PURCHASE_ID', 'ACTIVED'
];
const LimitationModel = {

	findById: function (limitationId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${LIMITATION_TABLE}
				WHERE LIMITATION_ID = ${limitationId}`)
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
	updateById: function (limitationId, limitation) {
		const updateQuery = joinUpdateSet(limitation, BaseWriteList);

		return db.q(`update ${LIMITATION_TABLE} SET ${updateQuery}
				WHERE LIMITATION_ID = ${limitationId}`);
	},
	create: function (limitation) {
		const insertQuery = joinInsertSet(limitation, BaseWriteList);

		return db.q(`insert into ${LIMITATION_TABLE}${insertQuery}`);
	}
};

module.exports = LimitationModel;
