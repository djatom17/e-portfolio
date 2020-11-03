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
  fetchProfileByUID(req.user.id, false, (err, profile) => {
    if (err || !profile) {
      return res.status(500).json({error:err});
    } else {
      return res.status(200).send(profile);
    }
  });
});

module.exports = profilerouter;
