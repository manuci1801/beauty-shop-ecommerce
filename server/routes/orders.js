const router = require("express").Router();

const { orderController } = require("../controllers");
const { isAuth, isAdmin } = require("../middleware");

router.route("/").get(isAuth, orderController.getAllOfUser);

router.route("/checkout").post(isAuth, orderController.addOne);
router.route("/checkout-no-auth").post(isAuth, orderController.addOneNoAuth);

router.route("/all").get(orderController.getAll);

module.exports = router;
