'use strict';
const wrap = require('co-express');
const ProductModel = require('../model/product');

exports.list = wrap(function * (req, res) {
	const productList = yield ProductModel.list();
	res.status(200).json(productList);
});