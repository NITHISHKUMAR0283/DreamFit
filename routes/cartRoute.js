const express = require("express")
const router = express.Router()
const {isAuthenticatedUser} = require("../middleware/auth")
const {addUserCart,getUserCart} = require("../controllers/cartController")

router.route("/cart/add").post(isAuthenticatedUser,addUserCart);
router.route("/cart").get(isAuthenticatedUser,getUserCart);

module.exports = router;