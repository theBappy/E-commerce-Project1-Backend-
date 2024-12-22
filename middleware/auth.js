const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Middleware to check if the user is authenticated
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    let token;

    // Extract the token from Bearer or Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = req.header('Authorization'); // Support alternate format
    }

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Please log in to access this resource' });
    }

    // Verify the JWT token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id).select('-password'); // Exclude the password from req.user
    next();
  } catch (error) {
    console.log('Authentication Error:', error); // Helpful for debugging
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

// ✅ Middleware to check if the user has the right role
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user.role}) is not allowed to access this resource` 
      });
    }
    next();
  };
};

  



  