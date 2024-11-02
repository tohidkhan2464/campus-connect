const mongoose = require("mongoose");
// Mongoose intantiate

// Route Handler
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postImageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  tags: {
    type: [String],
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
postSchema.index({ captions: "text", tags: "text" });

// Export
module.exports = mongoose.model("Post", postSchema);
