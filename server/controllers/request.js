const Activity = require("../models/Activity");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
// var objectId = mongoose.Types.ObjectId('569ed8269353e9f4c51617aa');

exports.acceptRequest = async (req, res) => {
  try {
    let userId = req.user.id;
    let { acceptingUserid } = req.body;
    acceptingUserid = new ObjectId(acceptingUserid);
    userId = new ObjectId(userId);
    // console.log("UserID", typeof userId);
    // console.log("Accepting userid", typeof acceptingUserid);

    if (!acceptingUserid) {
      return res.status(404).json({
        success: false,
        message: "Please enter valid user id",
      });
    }

    const acceptingUserActivity = await Activity.create({
      senderId: userId,
      message: "accepted your follow request.",
      isSeen: "False",
    });

    const updatedUserDetails = await User.findByIdAndUpdate(
      { _id: userId },
      // { pendingFollower: { $elemMatch: { $eq: harshita } } },
      {
        $pull: { pendingFollower: { $in: [acceptingUserid] } },
        $push: { follower: acceptingUserid },
      },

      { new: true }
    );

    const acceptingUserDetails = await User.findByIdAndUpdate(
      { _id: acceptingUserid },
      {
        $pull: { pendingFollowing: { $in: [userId] } },
        $push: { following: userId, activity: acceptingUserActivity._id },
      },
      // { pendingFollowing: { $elemMatch: { $eq: khan } } },
      // { $pull: { fruits: { $in: ["apples", "oranges"] }, vegetables: "carrots" } },

      { new: true }
    );

    // console.log("updatedUserDetails", updatedUserDetails);
    // console.log("acceptingUserDetails", acceptingUserDetails);

    return res.status(200).json({
      success: true,
      message: "You have successfully accepted the follow request.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while accepting the follow requests.",
    });
  }
};

// exports.getPendingFollowingRequests = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "Login first",
//       });
//     }

//     const userDetails = await User.findById(userId)
//       .populate("pendingFollowing")
//       .exec();

//     const pendingFollowingRequests = userDetails.pendingFollowing;

//     if (pendingFollowingRequests.length < 1) {
//       return res.status(4200).json({
//         success: true,
//         message: "No pending Following request",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Pending Following request successfully fetched",
//       data: pendingFollowingRequests,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: err.message + "error while getting follow requests.",
//     });
//   }
// };

// exports.sendFollowRequest = async (req, res) => {
//   try {
//     const { receivingUserId } = req.body;
//     const sendingUserId = req.user.id;
//     // console.log(
//     //   "SENDING",
//     //   typeof sendingUserId,
//     //   "RECEIVING",
//     //   typeof receivingUserId
//     // );

//     const sendingUserActivity = await Activity.create({
//       senderId: sendingUserId,
//       message: "Sends you a following request.",
//       isSeen: "False",
//     });

//     // const receiverUserActivity = await Activity.create({
//     //   senderId: sendingUserId,
//     //   message: "You sends a following request.",
//     //   isSeen: "False",
//     // });

//     const receiverUserDetails = await User.findByIdAndUpdate(
//       { _id: receivingUserId },
//       {
//         $push: {
//           pendingFollower: sendingUserId,
//           activity: sendingUserActivity._id,
//         },
//       },

//       { new: true }
//     );

//     if (!receiverUserDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "No such User Exists.",
//       });
//     }
//     const sendingUserDetails = await User.findByIdAndUpdate(
//       sendingUserId,
//       { $push: { pendingFollowing: receiverUserDetails._id } },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Request sent successfully",
//       data: { receiverUserDetails, sendingUserDetails },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: err.message + "error while sending follow requests.",
//     });
//   }
// };

// exports.getPendingFollowerRequest = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "Login first",
//       });
//     }

//     const userDetails = await User.findById(userId)
//       .populate("pendingFollowing")
//       .exec();

//     const pendingFollowerRequests = userDetails.pendingFollower;

//     if (pendingFollowerRequests.length < 1) {
//       return res.status(400).json({
//         success: true,
//         message: "No pending Follower request",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "pending Follower Requests successfully fetched",
//       data: pendingFollowerRequests,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: err.message + "error while getting follow requests.",
//     });
//   }
// };

exports.sendFollowRequest = async (req, res) => {
  try {
    const { receivingUserId } = req.body;
    const sendingUserId = req.user.id;
    console.log(
      "SENDING",
      typeof sendingUserId,
      "RECEIVING",
      typeof receivingUserId
    );

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
      sender?.follower?.includes(receivingUserId)
    ) {
      receiverUserDetails = await User.findByIdAndUpdate(
        receivingUserId,
        {
          $pull: {
            follower: sendingUserId,
          },
        },
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
          $push: {
            follower: sendingUserId,
            activity: sendingUserActivity._id,
          },
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
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while sending follow requests.",
    });
  }
};
