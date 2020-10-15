const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  star: Number,
  description: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("rates", categorySchema)