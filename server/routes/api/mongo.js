/**
 * This file mainly provides backend functions for handling
 * communications with MongoDB's instance.
 *
 * @file  API for MongoDB interactions
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires express,mongodb,auth.js,./models/*
 * @exports mongorouter,postUpload,fetchProfileByUID,postUpload,postDelete
 */
var express = require("express");
const { ObjectID } = require("mongodb");
var mongorouter = express.Router();
const auth = require("./auth");
const Profile = require("../../models/Profile");
const File = require("../../models/File");
const UserProfile = require("../../models/UserProfile");

const MAX_LINK_LENGTH = 24;
const validObjectId = new RegExp("^[0-9a-fA-F]{24}$");
const FILEPATH_S3 = "/api/file/dl/";
const FILEPATH_PROFILE = "/profile/";

/**
 * Fetches all initialised profile entries stored in "profiles" in MongoDB.
 *
 * Calls the table "profiles" via Mongoose and fetches all the profiles stored.
 * Then, the profiles are converted into an array of JSON objects, adhering to
 * Profile.js Schema.
 * Fetches only initialised profiles (isNewUser === false)
 * Sends back the array of profiles as a response body.
 */
mongorouter.get("/profiles", function (req, res, next) {
  //get all initialised profile entries from MongoDB.profiles
  Profile.find({
    isNewUser: false,
  })
    .lean()
    .exec((err, profiles) => {
      if (err) return res.status(500).json({ error: err });

      console.log("[Mongoose] Fetched all profiles.");
      profiles.forEach((profile) => {
        profile = appendProfilePaths(profile);
      });
      res.status(200).send(profiles);
    });
});

/**
 * Fetches a profile via custom link or profileID in path.
 *
 * Functionally similar to get all profiles, except this fetches only one.
 * Handles both custom user links or default profile id links.
 * @see mongorouter.get('/profiles')
 */
mongorouter.get("/p/:ID", function (req, res, next) {
  console.log("[Mongoose] Fetching " + req.params.ID + " from mongo.");

  var query = {};

  //Select appropriate query to pass (custom user links or profile od links)
  if (isValidObjectId(req.params.ID)) {
    query = { _id: ObjectID(req.params.ID) };
  } else {
    query = { linkToProfile: req.params.ID };
  }

  Profile.findOne(query, (err, profile) => {
    if (err) {
      console.log(
        "[Mongoose] Error in fetching " + req.params.ID + " from mongo."
      );
      res.status(500).json({ error: err });
    } else if (!profile) {
      console.log("[Mongoose] No profile found.");
      res.status(204).send(null);
    } else {
      //Successful operation
      console.log("[Mongoose] Fetched " + req.params.ID);
      profile = appendProfilePaths(profile);
      res.status(200).send(profile);
    }
  }).lean();
});

/**
 * Connects to the "profiles" table and update changes to a profile.
 *
 * Authenticates user before posting changes.
 * If updating linkToProfile, checks if the proposed change conflicts with
 * another user in the database, update fails if link conflicted.
 * Finds the document entry in "profiles" table by profile ID.
 * Updates the entry by only changing data fields that are modified.
 * Sends back the full, updated profile via res.
 *
 * @param {String} ID Profile ID must be listed in req.params.ID
 */
mongorouter.post("/p-update/:ID", [auth, checkLink], function (req, res, next) {
  //Post updates to mongo
  Profile.findOneAndUpdate(
    { _id: ObjectID(req.params.ID) },
    { $set: req.body },
    { returnNewDocument: true, useFindAndModify: false }
  ).then((updated_profile) => {
    if (!updated_profile) {
      return res
        .status(500)
        .json({ error: "[Mongoose] Profile update unsuccessful." });
    }
    //Successful Operation
    console.log("[Mongoose] Successfully posted updates to MongoDB.");
    res.status(200).send(updated_profile);
  });
});

//Inserting new profiles for admin
mongorouter.post("/p-profile", function (req, res, next) {});

/**
 * Filters/searches profiles based on the key skills that are stored.
 * The search phrase must be encoded and passed as a query parameter.
 *
 * Example: /search?skills=hand%20eye%20coordination&name=Anuja%20Nautreel
 *
 * Can be expanded to become a full-fledged search functionality.
 */
mongorouter.get("/search", function (req, res, next) {
  const searchSkills = decodeURIComponent(req.query.skills);
  const searchName = decodeURIComponent(req.query.name);
  var options = [];
  if (req.query.name) {
    options.push({
      text: { query: searchName, path: ["firstName", "lastName"] },
    });
  }
  if (req.query.skills) {
    options.push({
      text: {
        query: searchSkills,
        path: "keySkills",
      },
    });
  }
  console.log("[Mongoose] Searching profiles with", options);
  Profile.aggregate(
    [
      {
        $search: {
          compound: {
            must: options,
          },
        },
      },
    ],
    (err, profiles) => {
      if (err) {
        console.log("[Mongoose] Failed to search.");
        return res.status(500).json({ error: err });
      }
      console.log(
        "[Mongoose] Retrieved",
        profiles.length,
        "profiles with search term",
        searchSkills
      );
      profiles.forEach((profile) => {
        profile = appendProfilePaths(profile);
      });
      return res.status(200).json(profiles);
    }
  );
});

/**
 * Fetches profile JSON data stored in MongoDB.
 *
 * ASSUMES USER ALREADY AUTHENTICATED.
 * Firstly, finds a mapping of uid to pid from table users_to_profiles.
 * Then, fetches profile data from pid found.
 *
 * TODO: add boolean to check source of request
 *
 * @function [fetchProfileByUID]
 * @see profilerouter.get in myProfile.js
 *
 * @callback Requester~requestCallback
 * @param {string} uid  User ID of requestee in MongoDB.
 * @param {Boolean} isRaw Flag to signal profile returned has full path appended or not.
 * @param {Requester~requestCallback} callback - The callback that handles the response.
 */
const fetchProfileByUID = (uid, isRaw, callback) => {
  //Find mapping of UID to PID.
  mapUIDtoPID(uid, (err, userMap) => {
    if (err) {
      console.log("[Mongoose] User-profile mapping not found.");
      return callback(err, null);
    }
    console.log("[Mongoose] Found map entry.");
    //Fetches profile by pid mapped by given uid
    Profile.findById(userMap.pid, (err, profile) => {
      if (err) {
        console.log("[Mongoose] Error fetching profile.");
        return callback(err, null);
      }
      console.log("[Mongoose] Successfully fetched user profile.");
      if (!isRaw) {
        profile = appendProfilePaths(profile);
      }

      profile.userid = uid;
      //Successful operation
      return callback(null, profile);
    }).lean();
  });
};

/**
 * Validates link change in request body is not taken, if any.
 *
 * Checks if the link belongs to another user, rejects the update if
 * conflicting. Moves to next route if link is available or no link
 * change is requested.
 *
 * @param {JSON} req request body.
 * @param {JSON} res response body.
 * @param {} next method to next route.
 */
function checkLink(req, res, next) {
  //Checks if a link change is requested
  if ("linkToProfile" in req.body) {
    //Checks if linkToProfile has len < 24
    if (req.body.linkToProfile.length >= MAX_LINK_LENGTH) {
      delete req.body.linkToProfile;
      return res.status(400).send(req.body);
    }
    //Run distinct checks for linkToProfile, if exists.
    Profile.findOne(
      { linkToProfile: req.body.linkToProfile },
      (err, profile) => {
        if (err) {
          console.log(
            "[Mongoose] Error in fetching " + req.params.ID + " from mongo."
          );
          return res.status(500).json({ error: err });
          // TODO: res.send
        }
        //Found a conflicting profile
        if (profile) {
          console.log("Conflict link");
          delete req.body.linkToProfile;
          return res.status(409).send(req.body);
        } else {
          next();
        }
      }
    );
  }
  //No link change found in body, move to next route.
  else {
    next();
  }
}

/**
 * Finds the mapped PID of a given UID.
 *
 * Maps the given UID to a PID, if any, from users_to_profiles.
 *
 * @function [mapUIDtoPID]
 * @callback Requester~requestCallback
 * @param {String} uid User ID to be mapped.
 * @param {Requester~requestCallback} callback Handles callback function.
 */
const mapUIDtoPID = (uid, callback) => {
  console.log("[Mongoose] Fetching profile of uid " + uid);
  //Find authenticated user's profile from DB
  UserProfile.findOne({
    uid: uid,
  })
    .then((userMap) => {
      //Handles non-existent user profile
      if (!userMap) {
        console.log("[Mongoose] User profile does not exist.");
        return callback(null, null);
      } else {
        //Successful operation
        return callback(null, userMap);
      }
    })
    .catch((err) => {
      console.log("[Mongoose] Error fetching a profile");
      return callback(err, null);
    });
};

/**
 * Creates a document entry in "files" table in MongoDB.
 *
 * Triggered after file upload to S3 is successful. Stores the filename,
 * key, file description and User ID into "files", for convenience of
 * file retrieval/access.
 *
 * @function [postUpload]
 * @see s3router.post in s3.js
 *
 * @param {String} name User-defined filename
 * @param {String} url The key for the file stored in S3
 * @param {String} desc File description written by user.
 * @param {String} uid User ID of file owner.
 * @param {Boolean} isCert True if uploaded doc is a cert, false is projects.
 * @returns {Promise} Promise object representing successful creation of file
 *  entry in Profile.
 */
const postUpload = (name, filename, url, desc, uid, isCert) => {
  console.log("[Mongoose] Creating file entry");
  return new Promise((resolve, reject) => {
    // Find the profile corresponding to the user and retrieve it.
    fetchProfileByUID(uid, true, (e, profile) => {
      if (!e && profile) {
        // Hydrate object received as it is lean.
        profile = Profile.hydrate(profile);
        const newFileEntry = {
          name: name,
          filename: filename,
          description: desc,
          url: url,
        };
        if (isCert) {
          profile.certificates.push(newFileEntry);
        } else {
          profile.filesAndDocs.push(newFileEntry);
        }
        profile.save((err) => {
          if (err) {
            console.log("[Mongoose] File entry creation failed ", err);
            reject({ statusCode: 500 });
          } else {
            console.log("[Mongoose] File entry created.");
            resolve({ statusCode: 201 });
          }
        });
      } else {
        console.log(
          "[Mongoose] File entry creation unsuccessful - user not found."
        );
        reject({ statusCode: 401 });
      }
    });
  });
};

const getImageUrlOfUser = (uid) => {
  console.log("[Mongoose] Obtaining profile picture URL of user.");
  return new Promise((resolve, reject) => {
    fetchProfileByUID(uid, (err, profile) => {
      if (!err && profile) {
        // Removing paths used by API ** REMOVE IF IMPLEMENTED BOOLEAN **
        const url = profile.image.substr(profile.image.lastIndexOf("/") + 1);
        console.log("[Mongoose] Profile picture URL found", url);
        resolve({ statusCode: 200, pfpUrl: url });
      } else {
        console.log("[Mongoose] User not found.");
        reject({ statusCode: 401 });
      }
    });
  });
};

/**
 * Deletes File entry from Profile's filesAndDocs.
 *
 * Usually called after removing a file from S3.
 *
 * @function [postDelete]
 * @param {String} url Stored filepath in File entry.
 * @param {String} uid User ID of requester.
 * @param {Boolean} isCert True if doc is a cert, false is projects.
 * @returns {Promise} Promise object represents succesful removal of file entry
 *  from profile.
 */
const postDelete = (url, uid, isCert) => {
  console.log("[Mongoose] Deleting file entry from user.");
  return new Promise((resolve, reject) => {
    fetchProfileByUID(uid, true, (e, profile) => {
      if (!e && profile) {
        profile = Profile.hydrate(profile);
        //Determine correct file is removed.
        if (isCert) {
          profile.certificates = profile.certificates.filter(
            (item) => item.url !== url
          );
        } else {
          profile.filesAndDocs = profile.filesAndDocs.filter(
            (item) => item.url !== url
          );
        }
        profile.save((err) => {
          if (err) {
            console.log("[Mongoose] File entry deletion failed ", err);
            reject({ statusCode: 500 });
          } else {
            console.log("[Mongoose] File entry deleted.");
            resolve({ statusCode: 204 });
          }
        });
      } else {
        console.log(
          "[Mongoose] File entry creation unsuccesful - user not found."
        );
        reject({ statusCode: 401 });
      }
    });
  });
};

/**
 * Checks if str is ObjectId format.
 *
 * Does str adhere to MongoDB ObjectId format?
 *
 * @param {String} str String to test.
 * @returns {Boolean} String is valid ObjectId or not.
 */
const isValidObjectId = (str) => {
  return validObjectId.test(str);
};

/**
 * Appends full URI path into specific data fields.
 *
 * Appends URI path for image, linkToProfile and filesAndDocs.
 *
 * @function [appendProfilePaths]
 * @param {Object} profile Profile Schema for profile data.
 *
 * @returns {Object} Profile object after appending.
 */
const appendProfilePaths = (profile) => {
  profile.image = FILEPATH_S3 + profile.image;
  profile.linkToProfile =
    FILEPATH_PROFILE +
    (profile.linkToProfile ? profile.linkToProfile : profile._id);
  return profile;
};

module.exports = {
  mongorouter: mongorouter,
  postUpload: postUpload,
  postDelete: postDelete,
  fetchProfileByUID: fetchProfileByUID,
  mapUIDtoPID: mapUIDtoPID,
  getImageUrlOfUser: getImageUrlOfUser,
};
