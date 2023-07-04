const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    image: {
      type: String,
      // required: true
    },
    text: {
      type: String,
    },
    mathpix: {
      type: String,
    },
    answered: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

postSchema.methods.updateAnswer = async function() {
  const post = this;
  if (post.answered) {
    post.answered = false;
  } else {
    post.answered = true;
  }
  return post.save();
}

module.exports = mongoose.model("Post", postSchema);
