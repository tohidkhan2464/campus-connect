const Activity = require("../models/Activity");
const User = require("../models/User");


exports.sendFollowRequest = async (req, res) => {
  try {
    const { receivingUserId } = req.body;

    if (!receivingUserId) {
      return res.status(400).json({
        success: false,
        message: "receivingUserId is required in the request body",
      });
    }

    const sendingUserId = req.user.id;
    let receiverUserDetails;
    let sendingUserDetails;
    const sender = await User.findById(sendingUserId);
    const receiver = await User.findById(receivingUserId);

    if (!receiver) {
      return res.status(500).json({
        success: false,
        message: "No user Exists.",
      });
    }

    if (
      receiver?.follower?.includes(sendingUserId) ||
      sender?.following?.includes(receivingUserId)
    ) {
      receiverUserDetails = await User.findByIdAndUpdate(
        receivingUserId,
        { $pull: { follower: sendingUserId } },
        { new: true }
      );
      sendingUserDetails = await User.findByIdAndUpdate(
        sendingUserId,
        { $pull: { following: receiverUserDetails._id } },
        { new: true }
      );
    } else {
      const sendingUserActivity = await Activity.create({
        senderId: sendingUserId,
        message: "started following you.",
        isSeen: "False",
      });

      receiverUserDetails = await User.findByIdAndUpdate(
        { _id: receivingUserId },
        {
          $push: { follower: sendingUserId, activity: sendingUserActivity._id },
        },
        { new: true }
      );
      sendingUserDetails = await User.findByIdAndUpdate(
        sendingUserId,
        { $push: { following: receiverUserDetails._id } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Request sent successfully",
      data: { receiverUserDetails, sendingUserDetails },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message + "error while sending follow requests.",
    });
  }
};
