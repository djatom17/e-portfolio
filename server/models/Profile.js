const mongoose = require("mongoose");
const FileSchema = require('./File');

//Schema for each Profile stored in MongoDB
const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  keySkills: {
    type: Array,
    of: String,
  },
  workHistory: {
    type: Array,
    of: String,
  },
  education: {
    type: Array,
    default: {"0": "New User @ Check-Me-Out"}
  },
  image: String,
  linkToProfile: {
    type: String,
    unique: true,
  },
  social: {
    type: Array,
    of: String,
  },
  filesAndDocs: [FileSchema],
  about: {
    type: String,
    default: "I am cool.",
  },
  achievements: {
    type: Array,
    of: String,
  },
  subtitle: {
    type: String,
    default: "Flex it!",
  },
  layout: {
    type: String,
    default: "1",
  },
  isNewUser: Boolean,
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
