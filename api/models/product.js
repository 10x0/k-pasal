const mongoose = require('mongoose');
const { schema } = require('./user');

const productSchema = mongoose.Schema(
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
    price: {
      type: Number,
      required: [true, 'Please provide product price.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description.'],
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: [true, 'Please provide product category.'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide product stock count.'],
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  model: mongoose.model('Product', productSchema),
  schema: productSchema,
};
