const mongoose = require("mongoose");

const promotionCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: false,
  },
  discount: {
    type: Number,
    required: true,
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
  usableCount: {
    type: Number,
    default: -1,
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

module.exports = mongoose.model("promotion_codes", promotionCodeSchema);
