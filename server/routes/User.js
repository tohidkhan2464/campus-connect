const express = require("express");
const router = express.Router();
const { auth} = require("../middleware/Auth");
const {
    login,
    signUp,
    changePassword,
    // sendOTP, getOTP 
} = require("../controllers/Auth");
const {resetPasswordToken, resetPassword } = require("../controllers/resetPassword");

// routes for user login
router.get("/login", login);

// route for user signup
router.post("/signup", signUp);

// route for send otp
// router.post("/sendotp", sendOTP);
// router.get("/getotp", getOTP);

// routes for changing the password
router.post("/changepassword", auth, changePassword);

// routes for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// route for ressetting user's password after verification
router.post("/reset-password", resetPassword);

module.exports = router;