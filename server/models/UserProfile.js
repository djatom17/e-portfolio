/**
 * This file provides a schema for mapping a user ID to their corresponding
 * profile ID
 * 
 * @file Schema for UserProfile, consistent with users_to_profiles in Mongo
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports UserProfile
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to map a known User ID to their correct Profile ID.
 * 
 * @param {String} uid User ID stored in users.
 * @param {String} pid Profile ID stored in profiles.
 */
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