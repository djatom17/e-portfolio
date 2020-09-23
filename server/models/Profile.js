const mongoose = require('mongoose');

//Schema for each Profile stored in MongoDB
const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    keySkills: Array,
    education: {
        type: Array,
        required: true
    },
    image: String,
    linkToProfile: {
        type: String,
        unique: true,
        immutable: true
    },
    social: {
        type: Map,
        of: String
    },
    about: String,
    achievements: Array,
    subtitle: String
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);