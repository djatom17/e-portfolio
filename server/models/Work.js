/**
 * This file provides a schema generator for storing user employment history.
 * 
 * @file Schema for Work, as an Object in Profile.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports Work
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to store an instance of work information of a user.
 * 
 * @param {String} role User's job title.
 * @param {String} workplace User's place of work.
 * @param {Date} from Starting date of work.
 * @param {Date} to Ending date of work, if any.
 */
const WorkSchema = new Schema({
  role: {
      type: String,
      required: true,
  },
  workplace: {
      type: String,
      required: true,
  },
  from: {
      type: Date,
      required: true,
  },
  to: {
      type: Date,
  }
});

module.exports = WorkSchema;
