const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {
  getCollegeNews,
  searchUser,
  searchPost,
  searchHome
} = require("../controllers/search");

router.get("/postByCollege", auth, getCollegeNews);
router.post("/searchUser", auth, searchUser);
router.post("/searchPost", auth, searchPost);
router.get("/random", auth, searchHome);

module.exports = router;
