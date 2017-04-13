'use strict';
const map = require('./map');
const db = require('./db');

const LIMITATION_TABLE = 'biz_limitation';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'LIMIT_ID', 'USER_ID', 'LIMIT_CNT', 'VERSION'
];

const BaseWriteList = [
	'USER_ID', 'LIMIT_CNT', 'VERSION'
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
			.then(rows => toProp(rows[0]));
	},
	updateById: function (limitId, limitation) {
		const updateQuery = joinUpdateSet(limitation, BaseWriteList);

		return db.q(`update ${LIMITATION_TABLE} SET ${updateQuery}
				WHERE LIMIT_ID = ${limitId}`);
	},
	create: function (limitation) {
		const insertQuery = joinInsertSet(limitation, BaseWriteList);

		return db.q(`insert into ${LIMITATION_TABLE}${insertQuery}`);
	},
	updateLimitCntByUser: function (userId, value) {
		return db.q(`UPDATE ${LIMITATION_TABLE} SET LIMIT_CNT = LIMIT_CNT + ${value}
                    WHERE USER_ID = ${userId}`);
    },
    existUnbindLimit: function (userId, mask) {
        const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);
        return db.q(`SELECT ${filteredColumn} FROM ${LIMITATION_TABLE} WHERE USER_ID = ${userId}`)
            .then(rows => {
                const limit = toProp(rows[0]);
                return limit && limit.bindCnt > limit.limitCnt;
            });
    }
};

module.exports = LimitationModel;
