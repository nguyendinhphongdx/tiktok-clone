const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  annunciator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reportedObject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  content: [{
    type: String,
  }],
  reported_at: {
    type: Date,
    default: Date.now(),
  },
});

ReportSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ReportSchema.set("toJSON", {
  virtuals: true,
});

//compiler
const ReportModel = mongoose.model("Report", ReportSchema);
module.exports = ReportModel;
