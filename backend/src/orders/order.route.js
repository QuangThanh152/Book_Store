const express = require('express')
const Order = require('./order.model.js');
const { createAOrder, getOrderByEmail } = require('./order.controller.js');

const router = express.Router();

// tạo đơn hàng
router.post('/', createAOrder)

// lấy đơn hàng từ email
router.get('/email/:email', getOrderByEmail)
module.exports = router;
