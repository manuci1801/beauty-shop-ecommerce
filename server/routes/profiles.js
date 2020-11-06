const router = require("express").Router();

const { profileController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

// router.route("/").put(isAuth);

router
  .route("/address")
  .get(isAuth, profileController.getAddressesOfUser)
  .post(isAuth, profileController.addAddress);

// router.route("/:id").get(isAuth, profileController.getManyByID);

module.exports = router;
