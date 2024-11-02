const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
  likePost,
  createComment,
  getComments,
  savePost,
  saveImage,
} = require("../controllers/like");
const {
  getPostPic,
  sendPostPic,
  getUserPosts,
  getPostDetails,
} = require("../controllers/post");

router.get("/", auth, getPostPic);
router.get("/user-post", auth, getUserPosts);
router.get("/get-comments", auth, getComments);
router.post("/like", auth, likePost);
router.post("/comment", auth, createComment);
router.post("/postDetails", auth, getPostDetails);
router.post("/save", auth, savePost);
router.post("/saveImage", auth, saveImage);
router.post("/send", auth, sendPostPic);

module.exports = router;
