const express = require('express');
const { createOrder, verifyPayment } = require('../Controllers/paymentController');

const Payrouter = express.Router();

Payrouter.post('/orders', createOrder);
Payrouter.post('/verify', verifyPayment);

module.exports = Payrouter;
