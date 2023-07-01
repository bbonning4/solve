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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
