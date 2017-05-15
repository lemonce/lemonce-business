'use strict';

const express = require('express');
const Product = require('../controller/product');

const router = new express.Router();

router.get('/', Product.list);

module.exports = router;
