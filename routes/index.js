'use strict';

const path = require('path');
const express = require('express');
const userRoutes = require('./user-routes');
const limitRoutes = require('./limitation-routes');

const router = new express.Router();
const oneDay = 86400000;

// Static files middleware
router.use('/', express.static(
	path.resolve(__dirname, '../public'),
	{maxage: oneDay * 3}
));
router.use('/limit', limitRoutes);
router.use('/user', userRoutes);

/**
 * Error handler
 */
router.use(function (err, req, res, next) {
	// 404
	if (!err.status && err.message && (err.message.indexOf('not found') !== -1)) {
		return next();
	}
	if (!err.status) {
		// biz err
		console.error(err);
	}

	res.status(err.status || 500).json({msg: err.message});
});

router.use(function (req, res) {
	res.status(404).json({});
});

module.exports = router;
