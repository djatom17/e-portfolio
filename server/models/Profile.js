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
const FileSchema = require("./File");
const WorkSchema = require("./Work");
const SchoolSchema = require("./School");
const SocialSchema = require("./Social");
const ReferenceSchema = require("./Reference");
const ContactSchema = require("./Contact");

/**
 * MongoDB Schema to store all profile information of a user.
 *
 * @param {String} firstName First name of the user.
 * @param {String} lastName Last name of the user.
 * @param {String[]} keySkills Array of key user skills.
 * @param {WorkSchema[]} workHistory Array of Work Object by User.
 * @param {SchoolSchema[]} education Array of user academic experiences.
 * @param {String} image filepath to user's profile picture on S3.
 * @param {String} linkToProfile unique url to user profile page.
 * @param {SocialSchema} social A SocialSchema Object.
 * @param {ReferenceSchema[]} reference Array of Reference as user's referrals.
 * @param {FileSchema[]} filesAndDocs Array of File of uploaded user projects and documents.
 * @param {FileSchema[]} certificates Array of File of uploaded user certificates.
 * @param {String} primaryColour Colour representation for primary color of theme.
 * @param {String} secondaryColour Colour representation for secondary color of theme.
 * @param {String} about A description of user.
 * @param {String} specialty User defined specialty skill.
 * @param {String[]} achievements Array of user achievements.
 * @param {String} subtitle A brief description or text from user.
 * @param {String} timezone Timezone of user.
 * @param {Int} layout Option of user chosen profile display layout.
 * @param {ContactSchema} contact Contact details of user.
 * @param {Boolean} isNewUser Flag to indicate user has newly registered but
 *  has not set up profile information.
 */
const ProfileSchema = new mongoose.Schema({
  //POSSIBLE TODO
  // Add DOB
  // Change education to be like Work object
  // Add contactEmail or similar field
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
  education: [SchoolSchema],
  image: {
    type: String,
    default: "default.png",
  },
  linkToProfile: {
    type: String,
    unique: true,
    required: true,
  },
  social: SocialSchema,
  reference: [ReferenceSchema],
  primaryColour: {
    type: String,
    default: "#ffffff",
  },
  secondaryColour: {
    type: String,
    default: "e5e5e5",
  },
  filesAndDocs: [FileSchema],
  certificates: [FileSchema],
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
  specialty: {
    type: String,
    default: "Software Engineering and Computer Systems",
  },
  timezone: {
    type: String,
    default: "GMT +8",
  },
  layout: {
    type: String,
    default: "3",
  },
  contact: ContactSchema,
  isNewUser: {
    type: Boolean,
    default: false,
  },
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
