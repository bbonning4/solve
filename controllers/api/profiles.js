const Profile = require('../../models/profile');
const uploadFile = require("../../config/upload-file");

module.exports = {
  getProfile,
  getName,
  updateAvatar,
};

async function getProfile(req, res) {
  const profile = await Profile.findOne({ user: req.user._id })
  res.json(profile);
}

async function getName(req, res) {
  const name = req.user.name;
  res.json(name);
}

async function updateAvatar(req, res) {
  const imageURL = await uploadFile(req.file);
  const updatedProfile = await Profile.findByIdAndUpdate(req.body.profileId, {avatar: imageURL})
  res.json(updatedProfile);
}

/*--- Helper Functions --*/