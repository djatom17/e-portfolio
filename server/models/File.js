const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  uid: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = File = mongoose.model("files", FileSchema);
