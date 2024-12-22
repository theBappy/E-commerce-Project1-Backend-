const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [8, 'Price cannot exceed 8 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    category: {
      type: String,
      required: [true, 'Please enter product category'],
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 1,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Review' 
    }],
    reviewCount: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
