const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {
  getActivity,
  setActivitySeen,
} = require("../controllers/notification");

router.get("/activity", auth, getActivity);
router.post("/setActivity", auth, setActivitySeen);

module.exports = router;
