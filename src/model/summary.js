'use strict';
const map = require('./map');
const db = require('./db');

const SUMMARY_TABLE = 'biz_summary';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'SUMMARY_ID', 'USER_ID', 'LIMIT_COUNT', 'VERSION'
];

const BaseWriteList = [
	'USER_ID', 'LIMIT_COUNT', 'VERSION'
];
const SummaryModel = {

	findById: function (summaryId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${SUMMARY_TABLE}
				WHERE SUMMARY_ID = ${summaryId}`)
			.then(rows => toProp(rows[0]));
	},
	findByUser: function (userId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${SUMMARY_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(rows => toProp(rows[0]));
	},
	updateById: function (summaryId, summary) {
		const updateQuery = joinUpdateSet(summary, BaseWriteList);

		return db.q(`update ${SUMMARY_TABLE} SET ${updateQuery}
				WHERE SUMMARY_ID = ${summaryId}`);
	},
	create: function (summary) {
		const insertQuery = joinInsertSet(summary, BaseWriteList);

		return db.q(`insert into ${SUMMARY_TABLE}${insertQuery}`);
	},
	updateLimitCntByUser: function (userId, value) {
		return db.q(`UPDATE ${SUMMARY_TABLE} SET LIMIT_COUNT = LIMIT_COUNT + ${value}
                    WHERE USER_ID = ${userId}`);
    },
    existUnbindLimit: function (userId, mask) {
        const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);
        return db.q(`SELECT ${filteredColumn} FROM ${SUMMARY_TABLE} WHERE USER_ID = ${userId}`)
            .then(rows => {
                const limit = toProp(rows[0]);
                return limit && limit.bindCnt > limit.limitCnt;
            });
    }
};

module.exports = SummaryModel;
