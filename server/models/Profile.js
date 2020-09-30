const mongoose = require("mongoose");

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
  keySkills: Array,
  education: {
    type: Array,
    required: true,
  },
  image: String,
  linkToProfile: {
    type: String,
    unique: true,
  },
  social: {
    type: Map,
    of: String,
  },
  about: String,
  achievements: Array,
  subtitle: String,
  layout: String,
  //TODO add a Boolean check if first time user init profile
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
