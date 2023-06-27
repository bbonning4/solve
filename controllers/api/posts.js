const Post = require('../../models/post');
const Profile = require('../../models/profile');

module.exports = {
  create,
  getPost,
  index,
};

async function create(req, res) {
  const profile = await Profile.findOne({ user: req.user._id })
  const post = await Post.create({ text: req.body.text, profile: profile._id })
  res.json(post);
}

async function getPost(req, res) {
  const post = await Post.findById(req.params.id)
  res.json(post);
}

async function index(req, res) {
  const profile = await Profile.findOne({ user: req.user._id })
  const posts = await Post.find({ profile: profile._id })
  res.json(posts);
}

/*--- Helper Functions --*/