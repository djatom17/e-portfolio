const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO Insert 1 entry on register of new user
const UserProfileSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    pid: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = User_Profile = mongoose.model("users_to_profiles", UserProfileSchema);