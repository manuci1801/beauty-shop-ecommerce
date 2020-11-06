const router = require("express").Router();
const passport = require("passport");

const { userController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router
  .route("/")
  .get(isAuth, isAdmin, userController.getMany)
  .post(isAuth, isAdmin, userController.addOne);

router.route("/:id").delete(isAuth, isAdmin, userController.deleteOne);

module.exports = router;
