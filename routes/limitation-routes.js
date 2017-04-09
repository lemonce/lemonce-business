'use strict';

const express = require('express');
const Limitation = require('../controller/limitation');
const interceptor = require('./interceptor');

const router = new express.Router();

router.post('/add', interceptor.requireLogin, Limitation.create);
router.post('/add/:number', interceptor.requireLogin, Limitation.batchCreate);
router.get('/list', interceptor.requireLogin, Limitation.getList);
router.post('/update/:userId', Limitation.update);

router.post('/bind/:limitId', interceptor.requireLogin, Limitation.bind);
router.get('/unbind/:limitId', interceptor.requireLogin, Limitation.unBind);

router.options('*', function (req, res) {
	res.status(200).json();
});

module.exports = router;
