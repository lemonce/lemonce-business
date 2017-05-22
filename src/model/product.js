'use strict';
const map = require('./map');
const db = require('./db');

const PRODUCT_TABLE = 'biz_product';
const toProp = map.toProp;
const maskColumnAndJoinKey = map.maskColumnAndJoinKey;
const joinUpdateSet = map.joinUpdateSet;
const joinInsertSet = map.joinInsertSet;

const BaseColumnList = [
	'PRODUCT_ID', 'MARKET_ID', 'INCREMENT', 'PRICE', 'PUBLIC', 'URL', 'CURRENCY', 'DESCRIPTION'
];

const BaseWriteList = [
	'MARKET_ID', 'INCREMENT', 'PRICE', 'PUBLIC', 'URL', 'CURRENCY', 'DESCRIPTION'
];
const ProductModel = {
	create: function (product) {
		const insertQuery = joinInsertSet(product, BaseWriteList);

		return db.q(`insert into ${PRODUCT_TABLE}${insertQuery}`);
	},
	list: function (mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);
		return db.q(`SELECT ${filteredColumn} FROM ${PRODUCT_TABLE}`).then(rows => rows.map(toProp));
	},
	findById: function (productId, mask) {
		const filteredColumn = maskColumnAndJoinKey(BaseColumnList, mask);

		return db.q(`SELECT ${filteredColumn} FROM ${PRODUCT_TABLE}
				WHERE PRODUCT_ID = ${productId}`)
			.then(rows => toProp(rows[0]));
	},
	updateById: function (productId, product) {
		const updateQuery = joinUpdateSet(product, BaseWriteList);

		return db.q(`update ${PRODUCT_TABLE} SET ${updateQuery}
				WHERE PRODUCT_ID = ${productId}`);
	}
	
};

module.exports = ProductModel;
