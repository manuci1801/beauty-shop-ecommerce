const authRoute = require("./auth");
const userRoute = require("./users");
const brandRoute = require("./brands");
const productRoute = require("./products");
const categoryRoute = require("./categories");
const subcategoryRoute = require("./subcategories");

module.exports = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/brands", brandRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/subcategories", subcategoryRoute);
  app.use("/api/products", productRoute);

  return app;
};
