const router = require("express").Router();
const passport = require("passport");

const { userController } = require("../controllers");
const { isAdmin } = require("../middleware");

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    userController.getMany
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    userController.addOne
  );

module.exports = router;
