const router = require("express").Router();

const { commentController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  .get(commentController.getAll)
  .post(isAuth, commentController.addComment);

router.route("/reply").post(isAuth, commentController.addReplyComment);

// router.route("/:id").delete(isAuth, isAdmin, commentController.deleteOne);

// router.route("/check").post(commentController.checkValidCoupon);

// // blog categories route
// router
//   .route("/categories")
//   .get(commentController.getAllCategories)
//   .post(commentController.addCategory);

// // blog tags route
// router
//   .route("/tags")
//   .get(commentController.getAllTags)
//   .post(commentController.addTag);

module.exports = router;
