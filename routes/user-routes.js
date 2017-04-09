'use strict';

const express = require('express');
const User = require('../controller/user');
const interceptor = require('./interceptor');

const router = new express.Router();

router.post('/login', User.login);
router.get('/logout', User.logout);
router.get('/:type/:value/existence', User.isExisted);

router.get('/info', interceptor.requireLogin, User.info);
router.get('/captcha', User.captcha);
router.post('/add', User.create);
router.post('/update/:userId',interceptor.requireLogin, User.update);
router.post('/changepwd',interceptor.requireLogin, User.changePassword);

router.options('*', function (req, res) {
	res.status(200).json();
});

module.exports = router;
