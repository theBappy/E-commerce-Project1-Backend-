/**
 * 📌 1️⃣ Build Sort Helper
 * Extract and format the "sort" query
 */
const Product = require('../models/productModel');
exports.buildSort = (req) => {
    return req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt';
  };
  
  /**
   * 📌 2️⃣ Build Pagination Helper
   * Extract and calculate page, limit, and skip
   */
  exports.buildPagination = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
  };
  
  /**
   * 📌 3️⃣ Build Query Helper (Advanced Filtering + Search)
   * Extract, filter, and transform query operators like gte, lte, gt, lt
   * Also includes "search" logic for name, description, and category
   */
  exports.buildQuery = (req) => {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludeFields.forEach((el) => delete queryObj[el]);
  
    // Convert operators (gte, gt, lte, lt) into $gte, $gt, etc.
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = JSON.parse(queryStr);
  
    // 📌 Add "search" logic
    if (req.query.search) {
      query['$or'] = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { category: { $regex: req.query.search, $options: 'i' } }
      ];
    }
  
    return query;
  };
  
  /**
   * 📌 4️⃣ Count Filtered Products
   * Count the total number of products that match the query
   */
  exports.countFilteredProducts = async (query) => {
    return await Product.countDocuments(query);
  };
  