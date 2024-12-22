const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const { createPaymentIntent, processPayment, stripeWebhook } = require('../controllers/paymentController');

router.post('/create-intent', isAuthenticatedUser, createPaymentIntent);
router.post('/process-payment', isAuthenticatedUser, processPayment);
router.post('/webhook', isAuthenticatedUser, stripeWebhook);

module.exports = router;