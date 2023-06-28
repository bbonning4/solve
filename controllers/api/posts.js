const Post = require('../../models/post');
const Comment = require('../../models/comment');
const Profile = require('../../models/profile');
const uploadFile = require('../../config/upload-file');
const deleteFile = require('../../config/delete-file');

module.exports = {
  create,
  getPost,
  index,
  isUser,
  deletePost,
  createComment,
  getPostComments,
};

async function create(req, res) {
  const profile = await Profile.findOne({ user: req.user._id })
  if (req.file) {
    const imageURL = await uploadFile(req.file)
    const post = await Post.create({ text: req.body.text, profile: profile._id, image: imageURL })
    res.json(post);
  } else {
    const post = await Post.create({ text: req.body.text, profile: profile._id})
    res.json(post);
  }
}

async function getPost(req, res) {
  const post = await Post.findById(req.params.id)
  console.log(post);
  res.json(post);
}

async function index(req, res) {
  const profile = await Profile.findOne({ user: req.user._id })
  const posts = await Post.find({ profile: profile._id })
  res.json(posts);
}

async function deletePost(req, res) {
  const post = await Post.findById(req.params.id);
  if (post.image) {
    const imageURL = post.image;
    await deleteFile(imageURL);
  }
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true, message: 'post deleted'});
  } catch (error) {
    res.status(500).json({success: false, message: 'failed to delete post'});
  }
}

async function createComment(req, res) {
  const profile = await Profile.findOne({ user: req.user._id });
  const comment = await Comment.create({ text: req.body.text, post: req.params.id, profile: profile._id });
  res.json(comment);
}

async function getPostComments(req, res) {
  const comments = await Comment.find({post: req.params.id});
  res.json(comments);
}

/*--- Helper Functions --*/
async function isUser(req, res) {
  const post = await Post.findById(req.params.id);
  const profile = await Profile.findOne({ user: req.user._id })
  const isUser = post.profile.toString() === profile._id.toString();
  res.json(isUser);
}