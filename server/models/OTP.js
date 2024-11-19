const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { emailVerification } = require("../mails/emailVerification");

const OTPschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10 * 60,
  },
});

// Function to send email
async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification email from Campus Connect",
      emailVerification(otp)
    );
  } catch (err) {
    throw err;
  }
}

OTPschema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPschema);
