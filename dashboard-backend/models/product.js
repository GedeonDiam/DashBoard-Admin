const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'Électronique'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  promoted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
