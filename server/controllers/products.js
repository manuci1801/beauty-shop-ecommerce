const Product = require("../models/Product");
const Discount = require("../models/Discount");

function getDiscountPrice(products, discounts) {
  let _products = [];
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < products.length; i++) {
        let _isDiscount = discounts.find((e) =>
          `${e.brand}` === `${products[i].brandId._id}` ||
          `${e.category}` === `${products[i].categoryId._id}` ||
          `${e.subcategory}` === products[i].subcategoryId
            ? `${products[i].subcategoryId._id}`
            : "" || e.applyFor === "all"
        );
        if (typeof _isDiscount !== "undefined") {
          let priceDiscount = _isDiscount.discountPrice
            ? products[i].price - _isDiscount.discountPrice < 0
              ? 0
              : products[i].price - _isDiscount.discountPrice
            : products[i].price -
              Math.floor((products[i].price * _isDiscount.discountRate) / 100);

          _products.push({ ...products[i], priceDiscount });
        } else _products.push(products[i]);
      }
      // console.log(_products);
      resolve(_products);
    } catch (err) {
      reject(err);
    }
  });
}

// get all products
const getMany = async (req, res) => {
  try {
    const discounts = await Discount.find().lean();
    const products = await Product.find()
      .populate("brandId", ["_id", "name"])
      .populate("categoryId", ["_id", "name"])
      .populate("subcategoryId", ["_id", "name"])
      .lean();

    const _products = await getDiscountPrice(products, discounts);

    res.json(_products);
  } catch (err) {
    console.log(err);
  }
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
    amount,
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
    amount,
  });

  await newProduct.save();

  const _product = await Product.findById(newProduct._id)
    .populate("brandId", ["_id", "name"])
    .populate("categoryId", ["_id", "name"])
    .populate("subcategoryId", ["_id", "name"]);

  console.log(_product);
  res.json(_product);
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
