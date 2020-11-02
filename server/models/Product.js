const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    type: "subcategories",
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    type: "brands",
    required: true,
  },
  using: {
    type: String,
    default: "",
  },
  ingredient: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  sizes: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
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
