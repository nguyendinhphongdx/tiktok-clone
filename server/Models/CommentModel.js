const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  heart_count: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

CommentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CommentSchema.set("toJSON", {
  virtuals: true,
});

//compiler
const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
