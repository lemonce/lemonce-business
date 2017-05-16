'use strict';

const express = require('express');
const User = require('../controller/user');
const interceptor = require('./interceptor');

const router = new express.Router();

router.post('/login', User.login);
router.get('/logout', User.logout);
router.get('/:type/:value/existence', User.isExisted);

router.get('/info', interceptor.requireLogin, User.info);
router.get('/detail', interceptor.requireLogin, User.detail);
router.get('/captcha', User.captcha);

router.post('/', User.create);
router.put('/:userId',interceptor.requireLogin, User.update);
router.patch('/changepwd',interceptor.requireLogin, User.changePassword);
router.get('/verify', User.verifyEmail);
router.get('/send', interceptor.requireLogin, User.sendVerifyEmail);
router.post('/sendreset', User.resetEmail);
router.post('/resetpwd', User.resetPassword);

router.options('*', function (req, res) {
	res.status(200).json();
});

module.exports = router;
