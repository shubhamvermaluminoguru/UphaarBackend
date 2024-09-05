const mongoose = require('mongoose');

// Define the schema for cart items
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.String, required: true },
  products: [cartItemSchema], // Use the cartItemSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);