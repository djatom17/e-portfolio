/**
 * This file provides a schema for storing user login credentials.
 * 
 * @file Schema for User, consistent with users in Mongo
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports User
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to store a user login credentials.
 * 
 * @param {String} name Full name of user.
 * @param {String} email email address of user used for login.
 * @param {String} password hashed password of user.
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);