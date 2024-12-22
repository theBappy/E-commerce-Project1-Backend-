const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authControllers');
const { isAuthenticatedUser } = require('../middleware/auth');
const { uploadProfileImage } = require('../controllers/imageController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (requires JWT)
router.get('/profile', isAuthenticatedUser, getUserProfile);
router.post('/upload-profile-image', isAuthenticatedUser, upload.single('image'), uploadProfileImage);

module.exports = router;
