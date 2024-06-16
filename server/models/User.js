const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  accountType: {
    type: String,
    require: true,
    default: "Student",
    enum: ["Admin", "Lecturer", "Student"],
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  profileImage: {
    type: String,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  // pendingFollower: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     unique:true,
  //   },
  // ],
  // pendingFollowing: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     unique:true,
  //   },
  // ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique:true,
    },
  ],
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique:true,
    },
  ],
  notification: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  activity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
