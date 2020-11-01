/**
 * This file mainly provides backend functions for handling
 * communications with AWS S3 bucket.
 *
 * @file  API for AWS S3 interactions
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires express,crypto,aws-sdk,././config,busboy,./mongo,./auth,./models/*
 * @exports s3router
 */
var express = require("express");
var s3router = express.Router();
var crypto = require("crypto");
const config = require("config");
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const auth = require("./auth");
const mongo = require("./mongo");

const AWSBucket = config.get("s3Bucket");
const s3 = new AWS.S3({
  accessKeyId: config.get("iamUser"),
  secretAccessKey: config.get("iamSecret"),
});

/**
 * Handles GET request for a file in S3 bucket.
 *
 * Fetches the file from S3, specified from the filename in req.params[0].
 */
s3router.get("/dl/*", function (req, res, next) {
  var params = { Bucket: AWSBucket, Key: req.params[0] };
  console.log("[S3] Trying to get file ", req.params[0]);

  // Find an object given the raw filename/location in the bucket.
  s3.getObject(params, function (err, data) {
    if (err) {
      console.log("[S3] Error retrieving file");
      return res.status(err.statusCode).send({ error: err });
    }
    console.log("[S3] File retrieved");
    return res.status(200).send(data.Body);
  });
});

/**
 * Handles POST request for uploading file onto S3 and logging.
 *
 * req.files should have {file, description}.
 * 1. Creates a hashname from file contents and use it as key in S3.
 * 2. upload file onto S3 bucket.
 * 3. Create a new File entry in the user's profile for logging.
 *
 * @requires ./auth
 */
s3router.post("/upload/:type", auth, function (req, res, next) {
  console.log("[S3] Trying to upload file ");

  var busboy = new Busboy({ headers: req.headers });
  var hashName = "";
  var isCert = false;
  //Determine upload certificate or projects
  if (req.params.type === "certificate") {
    isCert = true;
  }

  busboy.on("finish", function () {
    var file = req.files.file;

    // Obtain hashed name for storage
    var md5sum = crypto.createHash("md5");
    md5sum.update(file.data);
    hashName = md5sum.digest("hex");

    var params = { Bucket: AWSBucket, Key: hashName, Body: file.data };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("[S3] Upload failed");
        return res.status(err.statusCode).send({ error: err });
      } else {
        console.log("[S3] Upload success");
        //Create new File entry in user's Profile, if it's not a profile picture.
        if (req.header("x-pfp-upload") === "true") {
          mongo
            .getImageUrlOfUser(req.user.id)
            .then((success) => {
              s3.deleteObject(
                { Bucket: AWSBucket, Key: success.pfpUrl },
                (e, response) => {
                  if (e) {
                    console.log(
                      "[S3] Unable to delete previous profile picture."
                    );
                    return res.status(500).json({ error: e });
                  }
                  console.log("[S3] Deleted previous profile picture.");
                  return res.status(200).json({ fileUrl: hashName });
                }
              );
            })
            .catch((e) => {
              return res.status(e.statusCode).json({ error: e });
            });
        } else {
          mongo
            .postUpload(file.name, hashName, req.files.description, req.user.id)
            .then((success) => {
              return res.status(success.statusCode).json({ fileUrl: hashName });
            })
            .catch((err) => {
              // If there is an error creating the entry, the file must be deleted from the bucket.
              return res.status(err.statusCode).json({ error: err });
            });
        }
      }
    });
  });

  req.pipe(busboy);
});

/**
 * Handles POST request for removing a file on S3 and its record on user Profile.
 *
 * 1. Validates the owner of the file is the requesting user.
 * 2. If validated, removes the file from S3 bucket and the File entry from
 *  user's Profile.
 * 3. Does nothing if validation fails.
 *
 * @requires ./auth
 */
s3router.post("/remove/:type/:file", auth, function (req, res, next) {
  console.log(
    "[S3] Trying to remove file " + req.params.file + " owned by " + req.user.id
  );
  var isCert = false;

  if (req.params.type === "certificate") {
    isCert = true;
  }

  validateFileOwner(req.user.id, req.params.file, isCert)
    .then((s) => {
      var params = { Bucket: AWSBucket, Key: req.params.file };
      s3.deleteObject(params, (err, reply) => {
        if (err) {
          console.log("[S3] File deletion failed.");
          return res.status(500).json({ error: err });
        } else {
          console.log("[S3] File deletion successful.");
          mongo
            .postDelete(req.params.file, req.user.id, isCert)
            .then((success) => {
              return res.status(success.statusCode);
            })
            .catch((err) => {
              return res.status(err.statusCode).json({ error: err });
            });
        }
      });
    })
    .catch((err) => {
      res
        .status(err.statusCode)
        .json({ error: "Cannot delete file - you are not authorised." });
    });
});

/**
 * Checks if the given userID has permission to edit a given file.
 *
 * Fetches the profile of given userID and check file existence in the
 * fetched profile. Explicitly has permission if user owns the profile
 * containing the file.
 *
 * @function [validateFileOwner]
 * @param {String} userID uid of User.
 * @param {String} userFile hashname of file to validate permission of.
 * @param {Boolean} isCert True if certificate, false for projects.
 *
 * @returns {Promise} Promise object represents user permission of file.
 */
const validateFileOwner = (userID, userFile, isCert) => {
  console.log("[S3] Validating file ownership.");
  return new Promise((resolve, reject) => {
    mongo.fetchProfileByUID(userID, true, (err, profile) => {
      if (err || !profile) {
        console.log("[S3] Permission to modify file denied.");
        reject({ statusCode: 500 });
      } else if (!isCert &&
        profile.filesAndDocs.filter((file) => file.url === userFile).length > 0
      ) {
        console.log("[S3] Permission granted.");
        resolve({ statusCode: 202 });
      } else if (isCert &&
        profile.certificates.filter((file) => file.url === userFile).length > 0
      ) {
        console.log("[S3] Permission granted.");
        resolve({ statusCode: 202 });
      } else {
        console.log("[S3] File not found in user's records.");
        reject({ statusCode: 403 });
      }
    });
  });
};

module.exports = s3router;
