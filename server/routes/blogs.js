const router = require("express").Router();

const { blogController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  // .get(isAuth, isAdmin, blogController.getAll)
  .post(blogController.addBlog);

// router.route("/:id").delete(isAuth, isAdmin, blogController.deleteOne);

// router.route("/check").post(blogController.checkValidCoupon);

// blog categories route
router
  .route("/categories")
  .get(blogController.getAllCategories)
  .post(blogController.addCategory);

// blog tags route
router
  .route("/tags")
  .get(blogController.getAllTags)
  .post(blogController.addTag);

module.exports = router;
