'use strict';
const map = require('./map');
const db = require('./db');

const RESET_TABLE = 'biz_user_reset';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;

const BaseColumnList = [
	'USER_ID', 'TOKEN', 'CREATE_TIME'
];

const ResetModel = {
	findByToken: function (token) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList);

		return db.q(`SELECT ${filteredColumn} FROM ${RESET_TABLE}
				WHERE TOKEN = ${db.escape(token)}`)
			.then(function (rows) {
				return toProp(rows[0]);
			});
	},
	findValid: function (userId) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList);
		return db.q(`SELECT ${filteredColumn} FROM ${RESET_TABLE}
				WHERE USER_ID=${userId} AND (UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(CREATE_TIME))/60/24 < 3
				ORDER BY CREATE_TIME DESC LIMIT 1`).then(rows => toProp(rows[0]));
	},
	create: function (userId) {
		return db.q(`INSERT INTO ${RESET_TABLE}(USER_ID, TOKEN) VALUES(${db.escape(userId)}, (SELECT UUID()))`).then(rows => rows.insertId);
	}
};

module.exports = ResetModel;
