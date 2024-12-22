const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  getMyOrders, 
  getAllOrders, 
  updateOrderStatus, 
  deleteOrder 
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Routes for users
router.post('/new-order', isAuthenticatedUser, createOrder); // Create a new order
router.get('/my-orders', isAuthenticatedUser, getMyOrders); // Get all orders for logged-in user
router.get('/my-orders/:id', isAuthenticatedUser, getOrderById); // Get order by ID

// Routes for admin
router.get('/', isAuthenticatedUser, authorizeRoles, getAllOrders); // Get all orders (Admin only)
router.put('/orders/:id/status', isAuthenticatedUser,   updateOrderStatus); // Update order status (Admin only)
router.delete('/orders/:id', isAuthenticatedUser, authorizeRoles, deleteOrder); // Delete an order (Admin only)



module.exports = router;
