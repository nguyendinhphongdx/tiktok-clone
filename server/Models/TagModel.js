const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
  },
  name: {
    type: String,
  },
  watch_count: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  }
});

TagSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TagSchema.set("toJSON", {
  virtuals: true,
});

//compiler
const TagModel = mongoose.model("Tag", TagSchema);
module.exports = TagModel;