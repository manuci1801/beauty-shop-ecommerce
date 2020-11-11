const router = require("express").Router();

const { couponController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  .get(isAuth, isAdmin, couponController.getAll)
  .post(isAuth, isAdmin, couponController.addOne);

router.route("/:id").delete(isAuth, isAdmin, couponController.deleteOne);

router.route("/check").post(couponController.checkValidCoupon);

module.exports = router;
