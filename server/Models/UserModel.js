const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Account'
  },
  avatar: {
    type: String,
  },
  nickname: {
    type: String,
  },
  name: {
    type: String,
  },
  follower_count: {
    type: Number,
  },
  following_count: {
    type: Number,
  },
  heart_count: {
    type: Number,
  },
  follower: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  fllowing: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  liked: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Video'
  }],
  likedComment: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
  }],
  favorites: [{
    type: String,
  }],
  isNewUser: {
    type: Boolean,
  },
  description: {
    type: String,
    default: '',
  },
  tick: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

//compiler
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
