/**
 * This file provides a schema generator for storing user contact details.
 * 
 * @file Schema for Contact, as an Object in Profile.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports ContactSchema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to store an instance of contact details of a user.
 * 
 * @param {String} phone Contact phone number of user.
 * @param {String} email User's contact email.
 * @param {String} address User's preferred residential address.
 */
const ContactSchema = new Schema({
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
});

module.exports = ContactSchema;
