/**
 * This file mainly provides backend functions for handling
 * user-specific profile pages with user auth.
 *
 * @file  API for user-authenticated profiles
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires express,auth.js,mongo.js
 * @exports profilerouter
 */
const express = require("express");
const profilerouter = express.Router();
const auth = require("./auth");
const fetchProfileByUID = require("./mongo").fetchProfileByUID;

/**
 * Handles GET requests for /.
 *
 * Validates user auth token prior to fetching,
 * fetches the requesting user's profile data stored in MongoDB.
 * The retrieved user profile is a JSON object, adhering to Profile.js Schema
 */
profilerouter.get("/", auth, (req, res, next) => {
  var profile = fetchProfileByUID(req.user.id);
  res.send(profile);
});

/**
 * Handles POST request for /edit.
 *
 * Validates user auth token prior to update.
 * Finalise changes and uploads changes to MongoDB.
 */
profilerouter.post("/edit", auth, (req, res, next) => {
  //TODO Implement profile edit here or mongo.js?

  //Redirects back to my-profile after changes are done.
  res.redirect("/");
});

module.exports = profilerouter;
