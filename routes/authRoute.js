const express = require("express")
const{registerUser,loginUser,logout} = require('../controllers/authController')
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route('/logout').get(logout);
module.exports=router;