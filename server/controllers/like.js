const Post = require("../models/Post");
const Comment = require("../models/Comment");
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const os = require("os");
const Activity = require("../models/Activity");
const User = require("../models/User");

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;
    // console.log("POST ID", postId);
    const postDetails = await Post.findById(postId);
    // console.log("POST DETAILS", postDetails);
    let updatedPost;

    if (postDetails.likes.includes(userId)) {
      // Already liked then unlike it now
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Not liked already then like it now
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
      );

      const activity = await Activity.create({
        senderId: userId,
        message: "Likes a post.",
        postId: updatedPost._id,
        isSeen: "False",
      });

      const activityUserId = postDetails.user;

      await User.findByIdAndUpdate(
        activityUserId,
        { $push: { activity: activity._id } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      data: updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while Liking",
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    // Fetch data from req.body
    const { postId, body } = req.body;

    const userId = req.user.id;
    // console.log("REQ->", req.body);
    // console.log("postId", postId, "comment - ", body);
    // create a comment object
    if (!postId || !body) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }
    const comment = new Comment({
      post: postId,
      userDetails: userId,
      body,
    });

    const savedComment = await comment.save();

    // find the post by ID, and add the new comment in its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    const activity = await Activity.create({
      senderId: userId,
      message: "comments on a post.",
      postId: updatedPost._id,
      isSeen: "False",
    });

    const activityUserId = updatedPost.user;

    await User.findByIdAndUpdate(
      activityUserId,
      { $push: { activity: activity._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Post commented successfully",
      data: updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while commenting",
    });
  }
};

exports.savePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const postdetails = await Post.findById(postId);
    const userId = req.user.id;
    const imageURL = postdetails.postImageUrl;
    const dirPath = os.homedir() + "/Downloads";

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const fileName = crypto.randomUUID() + ".png";

    const activity = await Activity.create({
      senderId: userId,
      message: "Saves a post.",
      postId: postdetails._id,
      isSeen: "False",
    });

    const activityUserId = postdetails.user;

    await User.findByIdAndUpdate(
      activityUserId,
      { $push: { activity: activity._id } },
      { new: true }
    );
    fetch(imageURL)
      .then((response) => response.buffer())
      .then((buffer) => {
        fs.writeFile(path.join(dirPath, fileName), buffer, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Image downloaded successfully");
            return res.json({
              success: true,
              message: "Image Dowunloaded successfully",
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while saving the post",
    });
  }
};

exports.saveImage = async (req, res) => {
  try {
    const { imageURL } = req.body;

    const dirPath = os.homedir() + "/Downloads";

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const fileName = crypto.randomUUID() + ".png";

    fetch(imageURL)
      .then((response) => response.buffer())
      .then((buffer) => {
        fs.writeFile(path.join(dirPath, fileName), buffer, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Image downloaded successfully");
            return res.json({
              success: true,
              message: "Image Dowunloaded successfully",
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while saving the post",
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(404).json({
        success: false,
        message: "No Post ID found in input.",
      });
    }

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("userDetails")
      .exec();

    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No Comments found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comments Found successfully",
      data: comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message + "error while getting the comments of post",
    });
  }
};
