const router = require("express").Router();

const { discountController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  // .get(discountController.getMany)
  .post(isAuth, isAdmin, discountController.addOne);

// router.route("/:id").delete(isAuth, isAdmin, discountController.deleteOne);

module.exports = router;
