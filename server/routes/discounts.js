const router = require("express").Router();

const { discountController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  .get(discountController.getAll)
  .post(isAuth, isAdmin, discountController.addOne);

router.route("/:id").delete(isAuth, isAdmin, discountController.deleteOne);

router.route("/admin").get(isAuth, isAdmin, discountController.getAllByAdmin);

module.exports = router;
