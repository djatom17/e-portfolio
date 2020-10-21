/**
 * This file provides a schema generator for storing File related information during
 * upload/download. Mainly used in ProfileSchema as an array.
 * 
 * @file Schema for FileSchema
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports FileSchema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Constructs a new FileSchema when called.
 * 
 * Creates a new JSON Schema by providing name, (optional) date and url.
 * 
 * @function FileSchema
 * @see ProfileSchema in Profile.js
 * @param {String} name user-defined file name.
 * @param {String} description User-defined file description.
 * @param {String} url filepath to file on S3 bucket.
 */
const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FileSchema;
