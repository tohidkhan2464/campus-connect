const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
    },
    password: {
        type: String,
        require: true,
    },
    accountType: {
        type: String,
        require: true,
        default:"Student",
        enum: ["Admin", "Lecturer", "Student"],
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    collegeName: {
        type: String,
    },
    profileImage: {
        type: String,
        default: `https://api.dicebear.com/7.x/fun-emoji/svg?radius=50`,
        required: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    departmentName: {
        type: String,
    },
    branchName: {
        type: String,
    },
    enrollmentNumber: {
        type: String,
    },
    pendingFollower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    pendingFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    notification: [{
        type: String,
    }],
    activity: [{
        type: String,
    }],
    news: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },

});

module.exports = mongoose.model("User", userSchema);