const mongoose = require('mongoose');
const productSchema = require('./product').schema;

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide product name.'],
    },
    products: {
      type: [productSchema],
      required: [true, 'Please provide order items.'],
    },
    paid: {
      type: Number,
      required: [true, 'Please provide paid amount.'],
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
