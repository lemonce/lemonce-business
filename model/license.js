'use strict';
const map = require('./map');
const db = require('./db');

const LICENSE_TABLE = 'biz_license';
const toProp = map.toProp;
const toSnake = map.toSnake;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'LICENSE_ID', 'USER_ID'
];

const BaseWriteList = [
	'LICENSE_ID', 'USER_ID'
];
const LicenseModel = {

	findById: function (licenseId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);
        licenseId = db.escape(licenseId);

		return db.q(`SELECT ${filteredColumn} FROM ${LICENSE_TABLE}
				WHERE LICENSE_ID = ${licenseId}`)
			.then(rows => toProp(rows[0]));
	},
	findByUser: function (userId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${LICENSE_TABLE}
				WHERE USER_ID = ${userId}`)
			.then(rows => rows.map(toProp));
	},
	updateById: function (licenseId, license) {
		const updateQuery = joinUpdateSet(license, BaseWriteList);
        licenseId = db.escape(licenseId);

		return db.q(`update ${LICENSE_TABLE} SET ${updateQuery}
				WHERE LICENSE_ID = ${licenseId}`);
	},
	create: function (license) {
		const insertQuery = joinInsertSet(license, BaseWriteList);

		return db.q(`insert into ${LICENSE_TABLE}${insertQuery}`);
	},
    deleteById: function (licenseId) {
        licenseId = db.escape(licenseId);
        return db.q(`DELETE FROM ${LICENSE_TABLE} WHERE LICENSE_ID = ${licenseId}`);
    },
    findCnt: function (type, value) {
        const TYPE = toSnake(type);
        const VALUE = db.escape(value);
        return db.q(`SELECT COUNT(1) FROM ${LICENSE_TABLE} 
                WHERE ${TYPE} = ${VALUE}`)
            .then(rows => rows[0]['COUNT(1)']);
    }
};

module.exports = LicenseModel;
