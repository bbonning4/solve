const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    // required: true
  },
  avatar: {
    type: String,
    default: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
    required: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
});

module.exports = mongoose.model('Profile', profileSchema);