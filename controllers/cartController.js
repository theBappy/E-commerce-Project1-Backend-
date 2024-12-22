const Cart = require('../models/Cart');

// 📌 Get Cart for a User
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'No cart found for this user' });
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Add Product to Cart 
exports.addToCart = async (req, res) => {
  const { productId, name, quantity, price } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $setOnInsert: { user: req.user.id }, // If no cart exists, create one
        $push: { 
          cartItems: { 
            productId, name, quantity, price 
          }
        }
      },
      { 
        upsert: true, // Create a new cart if it doesn't exist
        new: true // Return the updated document
      }
    );

    // Calculate total price
    cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();

    res.status(201).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// 📌 Update Quantity in Cart
exports.updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    const { id } = req.params; // id of the item to be updated
  
    try {
      const cart = await Cart.findOneAndUpdate(
        { 
          user: req.user.id, 
          'cartItems._id': id // Find the cart with the specific item id
        },
        { 
          $set: { 'cartItems.$.quantity': quantity } // Update the quantity of the specific product
        },
        { 
          new: true // Return the updated document
        }
      );
  
      if (!cart) {
        return res.status(404).json({ message: 'No cart found for this user' });
      }
  
      // Update total price
      cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      await cart.save();
  
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// 📌 Remove Item from Cart
exports.removeCartItem = async (req, res) => {
    const { id } = req.params; // id of the item to be removed
  
    try {
      const cart = await Cart.findOneAndUpdate(
        { 
          user: req.user.id 
        },
        { 
          $pull: { cartItems: { _id: id } } // Remove the product with the specific ID
        },
        { 
          new: true // Return the updated document
        }
      );
  
      if (!cart) {
        return res.status(404).json({ message: 'No cart found for this user' });
      }
  
      // Update total price
      cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      await cart.save();
  
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
