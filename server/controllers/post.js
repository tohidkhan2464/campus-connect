const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const cloudinary = require("cloudinary").v2;
const { Mongoose } = require("mongoose");

exports.getPostPic = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ postedAt: -1 })
      .populate("user")
      .exec();
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post Found successfully",
      data: posts,
    });
  } catch (err) {
     return res.status(500).json({
      success: false,
      message: err.message + "error while fetching post pic",
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ user: userId })
      .sort({ postedAt: -1 })
      .populate("user")
      .exec();

    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post Found successfully",
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message + "error while fetching post pic",
    });
  }
};

async function uploadFileToCloud(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.sendPostPic = async (req, res) => {
  try {
    const { caption, tags: _tags } = req.body;
    const userId = req.user.id;
    const postPic = req.files.postImageUrl;
    const tags = JSON.parse(_tags);
    if (!userId || !tags || !postPic || !caption) {
      return res.status(300).json({
        success: false,
        mesage: "All fields are required.",
      });
    }

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = postPic.name.split(".")[1].toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }

    const response = await uploadFileToCloud(postPic, "Campus_Connect");
    const postData = await Post.create({
      user: userId,
      postImageUrl: response.secure_url,
      caption: caption,
      tags: tags,
    });

    const userDetails = await User.findByIdAndUpdate(
      userId,
      { $push: { posts: postData._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Pic posted successfully",
      data: { postData, userDetails },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message + "error while posting pic",
    });
  }
};


exports.getPostDetails = async (req, res) => {
  try {
    const { postId } = req.body;
    const postDetails = await Post.findById(postId).populate("user").exec();

    let commentsDetails = [];
    if (postDetails?.comments?.length > 0) {
      for (const commentId of postDetails?.comments) {
        try {
          const commentDetails = await Comment.findById(commentId)
            .sort({ createdAt: "asc" })
            .populate("post")
            .populate("userDetails")
            .exec();
          if (commentDetails) {
            commentsDetails.push(commentDetails);
          }
        } catch (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message });
        }
      }
    }
    if (!postDetails) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post Found successfully",
      data: { postDetails, commentsDetails },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message + "error while fetching post pic",
    });
  }
};
