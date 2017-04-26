'use strict';
const map = require('./map');
const db = require('./db');

const SUMMARY_TABLE = 'biz_user_summary';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'USER_ID', 'LIMITATION_NUMBER', 'VERSION'
];

const BaseWriteList = [
	'USER_ID', 'LIMITATION_NUMBER', 'VERSION'
];
const SummaryModel = {
	findByUser: function (userId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${SUMMARY_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(rows => toProp(rows[0]));
	},
	updateByUserId: function (userId, summary) {
		const updateQuery = joinUpdateSet(summary, BaseWriteList);

		return db.q(`update ${SUMMARY_TABLE} SET ${updateQuery}
				WHERE USER_ID = ${userId}`);
	},
	create: function (summary) {
		const insertQuery = joinInsertSet(summary, BaseWriteList);

		return db.q(`insert into ${SUMMARY_TABLE}${insertQuery}`);
	},
	updateLimitationNumberByUser: function (userId, value) {
		return db.q(`UPDATE ${SUMMARY_TABLE} SET LIMITATION_NUMBER = LIMITATION_NUMBER + ${value}
                    WHERE USER_ID = ${userId}`);
	}
};

module.exports = SummaryModel;
