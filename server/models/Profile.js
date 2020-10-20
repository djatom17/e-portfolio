/**
 * This file provides a schema for storing user profile's information
 *  on the MongoDB
 * 
 * @file Schema for Profile, consistent with profiles in Mongo
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose,./File,./Work
 * @exports Profile
 */
const mongoose = require("mongoose");
const FileSchema = require('./File');
const WorkSchema = require("./Work");

/**
 * MongoDB Schema to store all profile information of a user.
 * 
 * @param {String} firstName First name of the user.
 * @param {String} lastName Last name of the user.
 * @param {String[]} keySkills Array of key user skills. 
 * @param {WorkSchema[]} workHistory Array of Work Object by User.
 * @param {String[]} education Array of user academic experiences.
 * @param {String} image filepath to user's profile picture on S3.
 * @param {String} linkToProfile unique url to user profile page.
 * @param {String[]} social Array of links to user-given social media.
 * @param {FileSchema[]} filesAndDocs Array of File of uploaded user documents.
 * @param {String} about A description of user.
 * @param {String[]} achievements Array of user achievements.
 * @param {String} subtitle A brief description or text from user.
 * @param {Int} layout Option of user chosen profile display layout.
 * @param {Boolean} isNewUser Flag to indicate user has newly registered but 
 *  has not set up profile information.
 */
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
  workHistory: [WorkSchema],
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
  isNewUser: {
    type: Boolean,
    default: true,
  } 
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
