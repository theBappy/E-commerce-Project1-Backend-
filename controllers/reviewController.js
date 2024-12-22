const Review = require('../models/Review');
const Product = require('../models/productModel');

// 📌 1️⃣ Create a Review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = await Review.create({
      product: productId,
      user: req.user._id, // Assuming req.user contains the authenticated user's data
      rating,
      comment
    });

    // 📌 Update the product's "reviews" array
    await Product.findByIdAndUpdate(productId, { 
      $push: { reviews: review._id } 
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// 📌 2️⃣ Get Reviews for a Product
exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'name email');
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// 📌 3️⃣ Delete a Review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await review.deleteOne();

    // 📌 Remove the review reference from the product
    await Product.findByIdAndUpdate(review.product, { 
      $pull: { reviews: reviewId } 
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
