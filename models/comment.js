const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    text: {
      type: String,
      required: true,
    },
    isAnswer: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

commentSchema.methods.updateAnswer = async function() {
  const comment = this;
  if (comment.isAnswer) {
    comment.isAnswer = false;
  } else {
    comment.isAnswer = true;
  }
  return comment.save();
}

module.exports = mongoose.model("Comment", commentSchema);
