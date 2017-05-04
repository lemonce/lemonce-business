'use strict';

const express = require('express');
const Purchase = require('../controller/purchase');

const router = new express.Router();

router.post('/', Purchase.receive);

module.exports = router;
