'use strict';

const express = require('express');
const Limitation = require('../controller/limitation');
const interceptor = require('./interceptor');

const router = new express.Router();

router.get('/list', interceptor.requireLogin, Limitation.getBindList);
router.get('/info', interceptor.requireLogin, Limitation.getLimitation);
router.post('/update/:limitId', Limitation.update);

router.post('/bind', interceptor.requireLogin, Limitation.bind);
router.get('/unbind/:licenseId', interceptor.requireLogin, Limitation.unBind);
router.post('/noop', Limitation.noop);

router.options('*', function (req, res) {
	res.status(200).json();
});

module.exports = router;
