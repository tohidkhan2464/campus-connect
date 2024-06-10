const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const { getActivity, getNotification } = require("../controllers/notification");

router.get("/", auth, getNotification);
router.get("/activity", auth, getActivity);

module.exports = router;
