const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  login,
  signUp,
  changePassword,
  sendOTP,
} = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changePassword", auth, changePassword);

module.exports = router;
