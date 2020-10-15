const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  },
  description: String,
  images: Array,
  isOld: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model("products", productSchema)