const User = require("../models/User");
const Activity = require("../models/Activity");

exports.getActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({ _id: userId })
      .populate({ path: "activity", populate: ["senderId", "postId"] })
      .exec();
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "No User found",
      });
    }

    const activities = userDetails.activity.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
    return res.status(200).json({
      success: true,
      message: "Activity Found successfully",
      data: activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: error.message + "error while getting the comments of post",
    });
  }
};

exports.setActivitySeen = async (req, res) => {
  try {
    const { activityId } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      { _id: activityId },
      { isSeen: "True" },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      data: activity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: error.message + "error while updating activity",
    });
  }
};
