/**
 * This file provides a schema generator for storing user social information.
 * 
 * @file Schema for Social, as an Object in Profile.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports SocialSchema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to store an instance of social media information of a user.
 * 
 * @param {String} platform The social media platform of the entry.
 * @param {String} link The URL link to the social media.
 * @param {Boolean} isEnabled True to allow link to be displayed on profile.
 */
const SocialSchema = new Schema({
  platform: {
    type: String,
    enum: ["Facebook", "LinkedIn", "Github"],
    required: true,
    default: "LinkedIn",
  },
  link: {
      type: String,
      required: true,
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = SocialSchema;
