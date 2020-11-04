const Product = require("../models/Product");

// get all products
const getMany = async (req, res) => {
  const { limit, offset } = req.query;

  const products = await Product.find()
    .populate("brandId", "name")
    .populate("categoryId", "name")
    .populate("subcategoryId", "name");

  res.json(products);
};

// add a new product
const addOne = async (req, res) => {
  if (req.files.length === 0) {
    return res.status(400).json({
      errors: [{ field: "image", message: "image field is required" }],
    });
  }
  const {
    name,
    description,
    categoryId,
    subcategoryId,
    brandId,
    price,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }
  if (!description) {
    return res.status(400).json({
      errors: [
        { field: "description", message: "description field is required" },
      ],
    });
  }
  if (!categoryId) {
    return res.status(400).json({
      errors: [{ field: "categoryId", message: "category field is required" }],
    });
  }

  let images = [];
  req.files.forEach((file) => {
    images = [...images, file.filename];
  });

  const newProduct = new Product({
    name,
    description,
    images,
    categoryId,
    subcategoryId,
    brandId,
    price,
  });

  await newProduct.save();
  res.json(newProduct);
};

// delete a product by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};
