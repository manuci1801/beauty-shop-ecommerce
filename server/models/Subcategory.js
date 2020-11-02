const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  name: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  description: {
    type: String,
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

// subCategorySchema.pre('')

module.exports = mongoose.model("subcategories", subcategorySchema);
