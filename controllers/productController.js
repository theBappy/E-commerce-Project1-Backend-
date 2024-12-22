const Product = require('../models/productModel');
const { buildQuery, buildSort, buildPagination, countFilteredProducts } = require('../utils/queryBuild');
const { cloudinary } = require('../middleware/imageUpload'); 

// 📌 Create a new Product with Image Upload (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // 📸 Handle Image Uploads
    let images = [];
    if (req.files) {
      images = req.files.map((file) => ({
        public_id: file.filename, // This is the public_id Cloudinary returns
        url: file.path, // This is the URL of the image
      }));
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// 📌 2. Get All Products (For Users)
exports.getAllProducts = async (req, res) => {
  try {
    // 1️⃣ Extract and format helper functions
    const sortBy = buildSort(req);
    const { page, limit, skip } = buildPagination(req);
    const queryObj = buildQuery(req);
    
    // 2️⃣ Count the total products that match the query
    const totalProducts = await countFilteredProducts(queryObj);
    const totalPages = Math.ceil(totalProducts / limit);
    
    // 3️⃣ Find products using Mongoose query
    const products = await Product.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    
    // 4️⃣ Send back response
    res.status(200).json({
      success: true,
      totalProducts,
      totalPages,
      currentPage: page,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message,
      errorStack: error.stack 
    });
  }
};

// 📌 3. Get Single Product Details
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 📌 4. Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 📌 5. Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.uploadProductImage = async (req, res) => {
  try {
    const files = req.files;  // Get all uploaded files as an array
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image file uploaded!' });
    }

    // Prepare an array to hold image URLs
    const imageUrls = [];

    // Loop through the files and upload each one to Cloudinary
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
        use_filename: true,
      });
      imageUrls.push(result.secure_url);  // Save the Cloudinary URL
    }

    // Respond with the uploaded image URLs
    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully!',
      imageUrls,  // Return the array of image URLs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

