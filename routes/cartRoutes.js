const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const { getCart, addToCart, updateCartItem, removeCartItem } = require('../controllers/cartController');

router.route('/cart').get(isAuthenticatedUser, getCart);
router.route('/cart').post(isAuthenticatedUser, addToCart);
router.route('/cart/:id').put(isAuthenticatedUser, updateCartItem);
router.route('/cart/:id').delete(isAuthenticatedUser, removeCartItem);

module.exports = router;
