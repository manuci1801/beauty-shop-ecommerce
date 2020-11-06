const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productSchema);
