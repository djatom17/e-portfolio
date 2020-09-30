/**
 * This file mainly provides backend functions for handling
 * communications with MongoDB's instance.
 *
 * @file  API for MongoDB interactions
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires express,mongodb,config,auth.js,./models/*
 * @exports mongorouter,postUpload,fetchProfileByUID
 */
var express = require("express");
const { ObjectID } = require("mongodb");
var mongorouter = express.Router();
const auth = require("./auth");
const Profile = require("../../models/Profile");
const File = require("../../models/File");
const UserProfile = require("../../models/UserProfile");
const { useCallback } = require("react");

const validObjectId = new RegExp("^[0-9a-fA-F]{24}$");

/**
 * Fetches all profile entries stored in "profiles" in MongoDB.
 *
 * Calls the table "profiles" via Mongoose and fetches all the profiles stored.
 * Then, the profiles are converted into an array of JSON objects, adhering to
 * Profile.js Schema
 * Sends back the array of profiles as a response body.
 */
mongorouter.get("/profiles", function (req, res, next) {
  //get all profile entries from MongoDB.profiles
  Profile.find()
    .lean()
    .exec((err, profiles) => {
      if (err) return res.send("[Mongoose] Error in fetching profiles.");

      console.log("[Mongoose] Fetched all profiles.");
      profiles.forEach((profile) => {
        profile.image = "/api/file/dl/" + profile.image;
        profile.linkToProfile =
          "/profile/" +
          (profile.linkToProfile ? profile.linkToProfile : profile._id);
      });
      res.send(profiles);
    });
});

/**
 * Fetches the profile that corresponds to given ObjectID.
 *
 * Functionally similar to get all profiles, except this fetches only one.
 * @see mongorouter.get('/profiles')
 */
mongorouter.get("/p/:ID", function (req, res, next) {
  console.log("[Mongoose] Fetching " + req.params.ID + " from mongo.");

  var query = {};
  //console.log(ObjectId(req.params.ID).toHexString());
  // TODO: Limit custom link length to <24.
  if (isValidObjectId(req.params.ID)) {
    query = { _id: ObjectID(req.params.ID) };
  } else {
    query = { linkToProfile: req.params.ID };
  }

  Profile.findOne(query)
    .lean()
    .exec((err, profile) => {
      if (!profile || err) {
        console.log(
          "[Mongoose] Error in fetching " + req.params.ID + " from mongo."
        );
        res.send(null);
        // TODO: res.send
      } else {
        console.log("[Mongoose] Fetched " + req.params.ID);
        profile.image = "/api/file/dl/" + profile.image;
        profile.linkToProfile = "/profile/" + profile.linkToProfile;
        res.send(profile);
      }
    });
});

/**
 * Connects to the "profiles" table and update changes to a profile.
 *
 * //TODO encodeURIComponent needed? Passing profile ID via URI.
 * //TODO Put profile ID in the params?
 * //TODO Returns the updated JSON profile, should it redirect?
 * //TODO validate request body before updating
 * //TODO validate user has authorisation to change profile
 *
 * Authenticates user before posting changes.
 * Finds the document entry in "profiles" table by profile ID.
 * Updates the entry by only changing data fields that are modified.
 * Sends back the full, updated profile via res.
 *
 * @param {String} ID Profile ID must be listed in req.params.ID
 */
mongorouter.post("/p-update/:ID", auth, function (req, res, next) {
  //Post updates to mongo
  Profile.findOneAndUpdate(
    { _id: ObjectID(req.params.ID) },
    { $set: req.body },
    { returnNewDocument: true, useFindAndModify: false }
  ).then((updated_profile) => {
    if (!updated_profile) {
      console.log("[Mongoose] Profile update unsuccessful.");
      res.status(500);
      //TODO: stop here
    }
    console.log("[Mongoose] Successfully posted updates to MongoDB.");
    res.send(updated_profile);
  });
});

// Insert a profile's first-time login information.
// User exists, but profile itself does not, yet.
// TODO: must be authorised and logged in.
mongorouter.post("/p-insert", auth, function (req, res, next) {
  // var profile = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   keySkills: req.body.keySkills,
  //   workHistory: req.body.workHistory,
  //   linkToProfile: req.body.linkToProfile,
  //   image: req.body.image,
  // };

  // const client = createNewClient();
  // console.log("Trying to send new information to mongo" + profile);
  // client.connect((err) => {
  //   assert.strictEqual(null, err);
  //   const collection = client.db("cae_users").collection("profiles");
  //   collection.insertOne(profile, function (err, result) {
  //     assert.strictEqual(null, err);
  //     console.log("item inserted");
  //     client.close();
  //   });
  // });

  // TODO: change this to preferably the user's brand-new profile page.
  res.redirect("/");
});

/**
 * Fetches profile JSON data stored in MongoDB.
 *
 * ASSUMES USER ALREADY AUTHENTICATED.
 * Firstly, finds a mapping of uid to pid from table users_to_profiles.
 * Then, fetches profile data from pid found.
 *
 * @function [fetchProfileByUID]
 * @see profilerouter.get in myProfile.js
 *  
 * @callback Requester~requestCallback
 * @param {string} uid  User ID of requestee in MongoDB.
 * @param {Requester~requestCallback} callback - The callback that handles the response.
 */
const fetchProfileByUID = (uid, callback) => {
  console.log("[Mongoose] Fetching profile of uid " + uid);
  //Find authenticated user's profile from DB
  UserProfile.findOne({
    uid: uid,
  }).then((userMap) => {
    //Handles non-existant user profile
    if (!userMap) {
      console.log("[Mongoose] User profile does not exist.");
      return callback(null);
    }
    console.log("[Mongoose] Found map entry.");
    //Fetches profile by pid mapped by given uid
    Profile.findById(userMap.pid, (err, profile) => {
      if (err) {
        console.log("[Mongoose] Error fetching profile.");
        return callback(null);
      }
      console.log("[Mongoose] Successfully fetched user profile.");
      profile.image = "/api/file/dl/" + profile.image;
      //Successful operation
      return callback(profile);
    });
  });
};

// Post-upload from S3, performs match between file, its hash, and uploader ID
/**
 * Creates a document entry in "files" table in MongoDB.
 *
 * Triggered after file upload to S3 is successful. Stores the filename,
 * key and User ID into "files", for convenience of file retrieval/access.
 *
 * @function [postUpload]
 * @see s3router.post in s3.js
 *
 * @param {String} name User-defined filename
 * @param {String} url The key for the file stored in S3
 * @param {String} uid User ID of file owner.
 */
const postUpload = (name, url, uid) => {
  console.log("[Mongoose] Creating file entry");
  File.create({ name, url, uid })
    .then(() => {
      console.log("[Mongoose] File entry created");
    })
    .catch((err) => {
      console.log("[Mongoose] File entry creation failed ", err);
    });
};

// Confirm is valid ObjectID
const isValidObjectId = (str) => {
  return validObjectId.test(str);
};

module.exports = {
  mongorouter: mongorouter,
  postUpload: postUpload,
  fetchProfileByUID: fetchProfileByUID,
};
