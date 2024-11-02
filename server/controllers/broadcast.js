const User = require("../models/User");
const Profile = require("../models/Profile");
const Activity = require("../models/Activity");
const axios = require("axios");

const axiosInstance = axios.create({});
const apiConnector = ({ method, url, bodyData, headers, params }) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
exports.broadcast = async (req, res) => {
  try {
    const { messageTitle, message, broadcastBy, broadcastTo } = req.body;
    const senderId = req.user.id;

    console.log("broadcastBy", broadcastBy);
    console.log("broadcastTo", broadcastTo);
    console.log("messageTitle", messageTitle);
    console.log("message", message);
    console.log("senderId", senderId);

    if (
      !message ||
      !broadcastTo ||
      !broadcastBy ||
      !messageTitle ||
      !senderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const senderDetails = await User.findById(senderId);
    if (!senderDetails) {
      return res.status(500).json({
        success: false,
        message: "No user Exists.",
      });
    }

    let users = [];
    const activity = await Activity.create({
      senderId,
      messageTitle,
      isSeen: "False",
    });
    if (broadcastBy === "College") {
      const userList = await Profile.find({ college: broadcastTo });
      console.log("userList College", userList);
      const profileIds = userList.map((user) => user._id);
      // let users = [];
      if (broadcastTo === "students") {
        const userslist = await User.aggregate([
          { $match: { accountType: "Student" } },
          { $match: { additionalDetails: { $in: profileIds } } },
        ]);
        users = users.concat(userslist);
        userslist.forEach(async (user) => {
          await User.findByIdAndUpdate(
            { _id: user?._id },
            { $push: { activity: activity._id } }
          );
        });
      } else {
        const userslist = await User.aggregate([
          { $match: { accountType: "Lecturer" } },
          { $match: { additionalDetails: { $in: profileIds } } },
        ]);
        users = users.concat(userslist);
        userslist.forEach(async (user) => {
          await User.findByIdAndUpdate(
            { _id: user?._id },
            { $push: { activity: activity._id } }
          );
        });
      }
    } else if (broadcastBy === "Year") {
      const userList = await Profile.find({ year: broadcastTo });
      console.log("userList Year", userList);
      const profileIds = userList.map((user) => user._id);
      const userslist = await User.aggregate([
        { $match: { accountType: "Student" } },
        { $match: { additionalDetails: { $in: profileIds } } },
      ]);
      users = users.concat(userslist);
      userslist.forEach(async (user) => {
        await User.findByIdAndUpdate(
          { _id: user?._id },
          { $push: { activity: activity._id } }
        );
      });
    } else if (broadcastBy === "Branch") {
      const userList = await Profile.find({ branchName: broadcastTo });
      console.log("userList Branch", userList);
      const profileIds = userList.map((user) => user._id);
      const userslist = await User.aggregate([
        { $match: { accountType: "Student" } },
        { $match: { additionalDetails: { $in: profileIds } } },
      ]);
      users = users.concat(userslist);
      userslist.forEach(async (user) => {
        await User.findByIdAndUpdate(
          { _id: user?._id },
          { $push: { activity: activity._id } }
        );
      });
    } else if (broadcastBy === "Department") {
      const userList = await Profile.find({ departmentName: broadcastTo });
      const profileIds = userList.map((user) => user._id);
      const userslist = await User.aggregate([
        { $match: { accountType: "Student" } },
        { $match: { additionalDetails: { $in: profileIds } } },
      ]);
      users = users.concat(userslist);
      userslist.forEach(async (user) => {
        await User.findByIdAndUpdate(
          { _id: user?._id },
          { $push: { activity: activity._id } }
        );
      });
    } else {
      const userslist = await User.find();
      users = users.concat(userslist);
      userslist.forEach(async (user) => {
        await User.findByIdAndUpdate(
          { _id: user?._id },
          { $push: { activity: activity._id } }
        );
      });
    }

    const userIds = users.map((user) => user._id);
    console.log("userIds", userIds);
    return res.status(200).json({
      success: true,
      message: "Message broadcasted successfully",
      senderDetails,
      userIds,
      data: {
        messageTitle,
        message,
        broadcastBy,
        broadcastTo,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message + "error while sending the broadcast message.",
    });
  }
};

exports.sendNotification = async (req, res) => {
  const { messageBody, accessToken } = req.body;
  // console.log("messageBody", messageBody);
  // console.log("accessToken", accessToken);
  const response = await apiConnector({
    method: "POST",
    url: `https://fcm.googleapis.com/fcm/notification`,
    bodyData: messageBody,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      access_token_auth: "true",
      project_id: "531721096206",
    },
  });
  // console.log("RESPONSE SEND_Notification", response);
  return res.status(200).json({
    success: true,
    message: "Notification Sent",
    data: response.data,
  });
};
