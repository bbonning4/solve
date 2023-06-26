const Profile = require('../../models/profile');

module.exports = {
  getProfile,
};

async function getProfile(req, res) {
  const profile = await Profile.findOne({ user: req.user._id })
  res.json(profile);
}

/*--- Helper Functions --*/