const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const { broadcast, sendNotification } = require("../controllers/broadcast");

router.post("/send", auth, broadcast);
router.post("/sendNotification", auth, sendNotification);

module.exports = router;
