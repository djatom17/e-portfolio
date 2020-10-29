/**
 * This file provides a schema for storing user referral details.
 * 
 * @file Schema for Reference, as an object in Profile.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires mongoose
 * @exports Reference
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * MongoDB Schema to store a user's referrals.
 * 
 * @param {String} name Full name of referral.
 * @param {String} role Position held by referral.
 * @param {String} company Company worked by referral.
 * @param {String} email Email address of referral.
 * @param {String} phone Phone number of referral.
 */
const ReferenceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Referral"        
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,        
    }
});

module.exports = ReferenceSchema;