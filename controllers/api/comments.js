const Post = require("../../models/post");
const Comment = require("../../models/comment");
const Profile = require("../../models/profile");

module.exports = {
  index,
};

async function index(req, res) {
  const profile = await Profile.findOne({ user: req.user._id });
  const comments = await Comment.find({ profile: profile._id });
  res.json(comments);
}
