const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.getCollegeNews = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided username",
      });
    }
    const userCollege = userDetails?.additionalDetails?.collegeName;

    if (!userCollege) {
      return res.status(404).json({
        success: false,
        message: "No college found for the user",
      });
    }

    const usersCollegues = await User.find({}, { collegeName: userCollege });

    if (!usersCollegues) {
      return res.status(200).json({
        success: true,
        message: "No collegues found",
      });
    }

    const userIds = usersCollegues.map((user) => user._id);
    const posts = await Post.find({ userId: { $in: userIds } }).sort({
      postedAt: -1,
    });

    if (!posts) {
      return res.status(200).json({
        success: true,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Posts found",
      data: posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while getting college posts",
    });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { firstName = "", userName = "", collegeName = "" } = req.body;
    console.log("First Name-> ", firstName);
    console.log("Username-> ", userName);
    console.log("College Name-> ", collegeName);
    let users = [];

    if (userName) {
      const profileDetails = await User.find({ userName: userName })
        .populate("additionalDetails")
        .exec();
      console.log("UserName Profile Details-> ", profileDetails);
      users = users.concat(profileDetails);
    }

    if (collegeName) {
      const userLists = await Profile.find({ collegeName: collegeName });
      const userIds = userLists.map((user) => user._id);
      const collegeDetails = await User.find({ _id: { $in: userIds } })
        .populate("additionalDetails")
        .sort({ createdAt: -1 });
      console.log("collegeName College Details-> ", collegeDetails);
      users = users.concat(collegeDetails);
    }

    if (firstName) {
      const search = await User.find({
        $or: [{ firstName: firstName }, { lastName: firstName }],
      })
        .populate("additionalDetails")
        .exec();
      console.log("First Name Search-> ", search);
      users = users.concat(search);
    }

    users = users.filter((user) => user._id.toString() !== req.user.id);

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while searching for user",
    });
  }
};

exports.searchPost = async (req, res) => {
  try {
    const { tags = "", username = "", captions = "" } = req.body;

    let posts = [];
    console.log("Tags-> ", tags);
    console.log("Username-> ", username);
    console.log("Captions-> ", captions);

    if (username) {
      const userDetails = await User.findOne({ userName: username });
      console.log("Post Search User Details-> ", userDetails);
      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: "No user found with the provided username",
        });
      }
      const postDetails = await Post.find({ user: userDetails._id }).sort({
        postedAt: -1,
      });
      console.log("User PostDetails-> ", postDetails);
      posts = posts.concat(postDetails);
    }

    if (tags) {
      const postDetails = await Post.find({ tags: { $in: tags.split(" ") } });
      console.log("Tags PostDetails-> ", postDetails);
      posts = posts.concat(postDetails);
    }

    if (captions) {
      const postDetails = await Post.find({
        $text: { $search: captions },
      }).sort({ postedAt: -1 });
      console.log("Caption PostDetails-> ", postDetails);
      posts = posts.concat(postDetails);
    }

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Posts found",
      data: posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + " error while searching for posts",
    });
  }
};

exports.searchHome = async (req, res) => {
  try {
    const postDetails = await Post.find({}).sort({ postedAt: -1 });

    if (!postDetails) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "posts found",
      data: postDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message + "error while searching for posts",
    });
  }
};
