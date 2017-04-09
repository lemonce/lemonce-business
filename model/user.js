'use strict';
const map = require('./map');
const db = require('./db');

const USER_TABLE = 'biz_user';
const toProp = map.toProp;
const toSnake = map.toSnake;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'USER_ID', 'USERNAME', 'PASSWORD', 'EMAIL', 'PHONE','REGISTER_TIME'
];

const BaseWriteList = [
	'USERNAME', 'PASSWORD', 'EMAIL', 'PHONE'
];
const UserModel = {

	findById: function (userId) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, 'password');

		return db.q(`SELECT ${filteredColumn} FROM ${USER_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(function (rows) {
				return toProp(rows[0]);
			});
	},
	search: function (username, password) {
		if (!username || !password) {
			return Promise.reject('no username or password');
		}
		username = db.escape(username);
		password = db.escape(password);

		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, 'password');

		return db.q(`SELECT ${filteredColumn} FROM ${USER_TABLE}
				WHERE USERNAME = ${username} and PASSWORD = ${password}`)
			.then(function (rows) {
				return toProp(rows[0]);
			});
	},
	isExist: function (type, value) {
		const TYPE = toSnake(type);
		value = db.escape(value);

		return db.q(`SELECT count(1) from ${USER_TABLE}
				WHERE ${TYPE} = ${value} limit 1`)
			.then(rows => Boolean(rows[0]['count(1)']));
	},
	updateById: function (userId, user) {
		const updateQuery = joinUpdateSet(user, BaseWriteList);

		return db.q(`update ${USER_TABLE} SET ${updateQuery}
				WHERE USER_ID = ${userId}`);
	},
	create: function (u) {
		const insertQuery = joinInsertSet(u, BaseWriteList);

		return db.q(`insert into ${USER_TABLE} ${insertQuery}`).then(rows => rows.insertId);
	},
	bodyChecker: {
		username: {
			isLength: {
				options: [{min: 6, max: 40}]
			},
			errorMessage: 'invalid name'
		},
		email: {
			isEmail: true,
			errorMessage: 'invalid email'
		},
		password: {
			isLength: {
				options: [{min: 6, max: 40}]
			},
			errorMessage: 'invalid password'
		}
	}
};

module.exports = UserModel;
