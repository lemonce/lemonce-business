'use strict';

const express = require('express');
const Limitation = require('../controller/limitation');
const interceptor = require('./interceptor');

const router = new express.Router();

router.post('/', interceptor.requireLogin, Limitation.create);
router.get('/', interceptor.requireLogin, Limitation.getList);

router.get('/summary', interceptor.requireLogin, Limitation.getSummary);
router.put('/:limitationId([0-9]+)', Limitation.updateSummary);

router.get('/bind', interceptor.requireLogin, Limitation.getBindList);
router.post('/bind', interceptor.requireLogin, Limitation.bind);
router.delete('/bind/:licenseId', interceptor.requireLogin, Limitation.unBind);

router.options('*', function (req, res) {
	res.status(200).json();
});

module.exports = router;
