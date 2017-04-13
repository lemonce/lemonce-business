'use strict';

const express = require('express');
const Purchase = require('../controller/purchase');
const interceptor = require('./interceptor');

const router = new express.Router();

router.post('/add', interceptor.requireLogin, Purchase.create);
router.get('/list', interceptor.requireLogin, Purchase.getList);

router.options('*', function (req, res) {
	res.status(200).json();
});

module.exports = router;
