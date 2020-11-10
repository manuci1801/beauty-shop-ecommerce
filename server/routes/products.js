const router = require("express").Router();

const { productController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

const { processFile } = require("../utils");

router
  .route("/")
  .get(productController.getMany)
  .post(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", true),
    productController.addOne
  );

router
  .route("/:id")
  .delete(productController.deleteOne)
  .put(
    isAuth,
    isAdmin,
    processFile.uploadFile("image", true),
    productController.updateOne
  );

module.exports = router;
