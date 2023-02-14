const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
  },
  name: {
    type: String,
  },
  music: {
    type: String,
  },
  singer: {
    type: String,
  },
  watch_count: {
    type: Number,
  },
});

MusicSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

MusicSchema.set("toJSON", {
  virtuals: true,
});

//compiler
const MusicModel = mongoose.model("Music", MusicSchema);
module.exports = MusicModel;
