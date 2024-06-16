const mongoose = require("mongoose");
// Mongoose intantiate

// Route Handler
const notificationSchema = new mongoose.Schema({
  broadcasterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  isSeen: {
    type: String,
    require: true,
    default: "False",
    enum: ["True", "False"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Export
module.exports = mongoose.model("Notification", notificationSchema);
