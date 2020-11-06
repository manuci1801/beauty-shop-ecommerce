const authController = require("./auth");
const userController = require("./users");
const brandController = require("./brands");
const categoryController = require("./categories");
const subcategoryController = require("./subcategories");
const productController = require("./products");
const contactController = require("./contacts");
const profileController = require("./profiles");
const orderController = require("./orders");
const discountController = require("./discounts");

module.exports = {
  authController,
  userController,
  brandController,
  categoryController,
  subcategoryController,
  productController,
  contactController,
  profileController,
  orderController,
  discountController,
};
