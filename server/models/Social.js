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
 * Stores a social media platform's link of user.
 * 
 * @param {String} link URL link to given platform.
 * @param {Boolean} isEnabled True to allow link to be shown to public.
 */
const PlatformSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
        default: true,
    }
});

/**
 * MongoDB Schema to store an instance of social media information of a user.
 * 
 * @param {PlatformSchema} github 
 * @param {PlatformSchema} facebook
 * @param {PlatformSchema} linkedin
 * @param {PlatformSchema} twitter
 * @param {PlatformSchema[]} others Array of other social media platforms if any.
 */
const SocialSchema = new Schema({
  github: PlatformSchema,
  facebook: PlatformSchema,
  linkedin: PlatformSchema,
  twitter: PlatformSchema,
  others: [PlatformSchema],
});

module.exports = SocialSchema;
