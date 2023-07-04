const Post = require("../../models/post");
const Comment = require("../../models/comment");
const Profile = require("../../models/profile");

module.exports = {
  index,
  markAnswer,
  unmarkAnswer,
};

async function index(req, res) {
  const profile = await Profile.findOne({ user: req.user._id });
  const comments = await Comment.find({ profile: profile._id });
  res.json(comments);
}

async function markAnswer(req, res) {
  const comment = await Comment.findById(req.body.id);
  await Comment.updateMany({ post: comment.post }, { isAnswer: false });
  await Comment.findByIdAndUpdate(req.body.id, { isAnswer: true });
  await Post.findByIdAndUpdate(comment.post, { answered: true });

  res.json(true);
}

async function unmarkAnswer(req, res) {
  const comment = await Comment.findById(req.body.id);
  await Comment.updateMany({ post: comment.post }, { isAnswer: false });
  await Post.findByIdAndUpdate(comment.post, { answered: false });

  res.json(true);
}
