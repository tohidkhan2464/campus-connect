const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  // getPendingFollowingRequests,
  // getPendingFollowerRequest,
  sendFollowRequest,
  acceptRequest,
} = require("../controllers/request");

const {
  updateProfile,
  deleteAccount,
  getUserDetails,
  getUserProfile,
  getAllUsers,
  updateDisplayPicture,
} = require("../controllers/Profile");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.get("/getUserProfile", auth, getUserProfile);
router.get("/getAllUsers", getAllUsers);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.post("/send-request", auth, sendFollowRequest);
module.exports = router;
