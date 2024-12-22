const User = require('../models/User'); 
const cloudinary = require('cloudinary').v2;




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadProfileImage =  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
  
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_images', 
        resource_type: 'image',  
      });
  
      // Get the secure URL of the uploaded image
      const imageUrl = result.secure_url;
  
      // Save the image URL to the user's profile in the database
      const user = await User.findById(req.user.id); 
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.profileImage = imageUrl; 
      await user.save();
  
      res.json({ success: true, data: { url: imageUrl } });
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      res.status(500).json({ success: false, message: 'Error uploading image' });
    }
};