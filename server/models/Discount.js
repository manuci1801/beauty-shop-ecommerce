const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
  discountRate: {
    type: Number,
    min: 0,
    max: 100,
  },
  discountPrice: {
    type: Number,
    // required: true,
  },
  applyFor: {
    type: String,
    enum: ["*", "category", "subcategory", "brand"],
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: () => this.applyFor === "category",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    type: "subcategories",
    required: () => this.applyFor === "subcategory",
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    type: "brands",
    required: () => this.applyFor === "brand",
  },
  startAt: {
    type: Date,
    default: "",
  },
  endAt: {
    type: Date,
    default: "",
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

module.exports = mongoose.model("discounts", discountSchema);
