'use strict';
const map = require('./map');
const db = require('./db');

const DETAIL_TABLE = 'biz_user_detail';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;

const BaseColumnList = [
	'USER_ID', 'NATIONALITY'
];

const BaseWriteList = [
	'USER_ID', 'NATIONALITY'
];
const DetailModel = {
	findById: function (userId) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList);

		return db.q(`SELECT ${filteredColumn} FROM ${DETAIL_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(function (rows) {
				return toProp(rows[0]);
			});
	},
	updateById: function (userId, detail) {
		const updateQuery = joinUpdateSet(detail, BaseWriteList);

		return db.q(`UPDATE ${DETAIL_TABLE} SET ${updateQuery}
				WHERE USER_ID = ${userId}`);
	}
};

module.exports = DetailModel;
