'use strict';

const path = require('path');
const express = require('express');
const userRoutes = require('./user-routes');
const limitationRoutes = require('./limitation-routes');
const purchaseRoutes = require('./purchase-routes');

const router = new express.Router();

router.use('/limitation', limitationRoutes);
router.use('/user', userRoutes);
router.use('/purchase', purchaseRoutes);
// router.use('/purchase', purchaseRoutes);

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

// router.use(function (req, res) {
// 	res.status(404).json({});
// });

module.exports = router;
