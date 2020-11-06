const router = require("express").Router();

const { orderController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router.route("/checkout").post(isAuth, orderController.addOne);

// router.route("/:id").get(isAuth, orderController.getManyByID);

module.exports = router;
