const Order = require('../models/Order');

// ✅ 1️⃣ Create Order
exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingInfo, paymentInfo, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items found' });
    }

    const order = await Order.create({
      user: req.user._id, // comes from the 'protect' middleware
      orderItems,
      shippingInfo,
      paymentInfo,
      totalPrice
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error });
  }
};

// ✅ 2️⃣ Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve order', error });
  }
};

// ✅ 3️⃣ Get My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders', error });
  }
};

// ✅ 4️⃣ Get All Orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders', error });
  }
};

// ✅ 5️⃣ Update Order Status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if(!validStatuses.includes(status)){
    return res.status(400).json({message: 'Invalid status value'});
  }
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ success: true, message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error });
  }
};

// ✅ 6️⃣ Delete Order (Admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.deleteOne();
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error });
  }
};

  