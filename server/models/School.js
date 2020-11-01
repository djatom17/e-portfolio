/**
 * This file provides a schema generator for storing user education history.
 * 
 * @file Schema for School, as an Object in Profile.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports SchoolSchema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to store an instance of education history of a user.
 * 
 * @param {String} institution School/University name.
 * @param {String} name Full name of education.
 * @param {String} level Education level of this education history (i.e Highschool)
 * @param {String} major (Optional) List the major of this education.
 * @param {String} description User description of school.
 * @param {Date} from Starting date of education.
 * @param {Date} to Date of graduation, if any.
 */
const SchoolSchema = new Schema({
  institution : {
      type: String,
      default: "University of Melbourne",
      required: true,
  },
  name: {
      type: String,
      default: "Bachelor of Science",
      required: true,
  },
  level: {
      type: String,
      required: true,
      default: "Degree",
  },
  major: {
      type: String,
  },
  description: {
    type: String,
  },
  from: {
      type: Date,
      required: true,
      default: Date.now(),
  },
  to: {
      type: Date,
  }
});

module.exports = SchoolSchema;
