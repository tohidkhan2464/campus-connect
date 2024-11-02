const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { Mongoose } = require("mongoose");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    const {
      about,
      branchName,
      cityName,
      collegeName,
      contactNumber,
      dateOfBirth,
      departmentName,
      enrollmentNumber,
      firstName,
      gender,
      lastName,
      year,
    } = req.body.data;
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    await userDetails.save();

    profileDetails.enrollmentNumber = enrollmentNumber;
    profileDetails.year = year;
    profileDetails.collegeName = collegeName;
    profileDetails.departmentName = departmentName;
    profileDetails.branchName = branchName;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    profileDetails.cityName = cityName;
    await profileDetails.save();

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      updatedUserDetails: updatedUserDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
      error: err.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword } = req.body;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (await bcrypt.compare(currentPassword, userData.password)) {
      await Profile.findByIdAndDelete({ _id: userData?.additionalDetails });
      await Post.updateMany({}, { $pull: { likes: userId } }, { new: true });
      if (await Comment.find({ userDetails: userId })) {
        const comments = await Comment.find({ userDetails: userId });
        if (comments) {
          await Post.updateMany(
            {},
            { $pull: { comments: { $in: comments } } },
            { new: true }
          );
          comments.forEach((element) => {
            Comment.deleteMany({ _id: element._id });
          });
        }
      }
      await Post.deleteMany({ _id: { $in: userData.posts } });
      await User.findByIdAndDelete({ _id: userId });
      return res.status(200).json({
        success: true,
        data: userData,
        message: "User Deleted successfully.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Unable to delete profile. Wrong Password",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete profile.",
      error: err.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched User details successfully.",
      data: userDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get user Details.",
      error: err.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { userName } = req.query;
    const userProfile = await User.findOne({ userName: userName })
      .populate("additionalDetails")
      .exec();
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched User Profile successfully.",
      data: userProfile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get user Profile.",
      error: err.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const profilePicture = req.files.profilePicture;
    const folderName = process.env.FOLDER_NAME;
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = profilePicture.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }

    const response = await uploadImageToCloudinary(profilePicture, folderName);
    const userDetails = await User.findByIdAndUpdate(userId);
    userDetails.profileImage = response.secure_url;
    await userDetails.save();

    return res.json({
      success: true,
      image_url: response.secure_url,
      message: "Image Uploaded successfully",
      updatedUserDetails: userDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let allUsers = await User.find({})
      .sort({ createdAt: -1 })
      .populate("additionalDetails")
      .exec();
    if (!allUsers) {
      return res.status(404).json({
        success: false,
        message: "Users not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Users successfully.",
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get users.",
      error: err.message,
    });
  }
};
