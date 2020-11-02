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
    min: 0,
    max: 100,
    required: true,
  },
  applyFor: {
    type: String,
    enum: ["*", "category", "subcategory", "brand"],
    required: true,
  },
  applyForName: {
    type: "String",
    required: true,
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
