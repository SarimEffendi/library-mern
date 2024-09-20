const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const verifyPayment = require('../middlewares/verifyPayment');
const authenticate = require('../middlewares/authenticate');

// router.post('/create-payment-intent',authenticate, paymentController.createPaymentIntent);
// router.post('/create-payment',authenticate, paymentController.createPayment);

router.post('/create-checkout-session', authenticate, paymentController.createCheckoutSession);
router.post('/confirm-payment', authenticate, paymentController.confirmPayment);

module.exports = router;
