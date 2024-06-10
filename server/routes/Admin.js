const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  login,
  signUp,
  changePassword,
  sendOTP,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changePassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
