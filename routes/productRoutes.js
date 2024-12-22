const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getAllProducts, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct,
  uploadProductImage
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { upload } = require('../middleware/imageUpload');



// 📌 Public Routes
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);

// 📌 Admin Routes (Create, Update, Delete)
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.post('/admin/product/upload', isAuthenticatedUser, upload.array('images', 5), uploadProductImage);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
