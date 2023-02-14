const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  birthday: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});

AccountSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AccountSchema.set('toJSON', {
  virtuals: true,
});

//compiler
const AccountModel = mongoose.model("Account", AccountSchema);
module.exports = AccountModel;
