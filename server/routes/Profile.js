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
router.get("/getAllUsers", auth, getAllUsers);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// router.get("/follow", auth, getPendingFollowingRequests);
// router.get("/followers", auth, getPendingFollowerRequest);
router.post("/send-request", auth, sendFollowRequest);
router.post("/accept-request", auth, acceptRequest);

// router.get("/follow", auth,  getFollowings);
// router.get("/followers", auth, getFollowers);
// DELETE_ACCOUNT_BY_ADMIN: BASE_URL + "/profile/deleteAccountByAdmin",

module.exports = router;
