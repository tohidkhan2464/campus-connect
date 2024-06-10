const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  likePost,
  // unlikePost,
  createComment,
  getComments,
  savePost,
} = require("../controllers/like");
const {
  getPostPic,
  sendPostPic,
  getUserPosts,
  getPostDetails,
  // videoUpload
} = require("../controllers/post");

router.get("/", auth, getPostPic);
router.get("/user-post", auth, getUserPosts);
router.get("/get-comments", auth, getComments);
router.post("/like", auth, likePost);
router.post("/comment", auth, createComment);
router.post("/postDetails", auth, getPostDetails);
router.post("/save", auth, savePost);
router.post("/send", auth, sendPostPic);
// router.post("/send-video", videoUpload);

module.exports = router;
