var express = require("express");
var s3router = express.Router();
var crypto = require("crypto");
const config = require("config");
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const auth = require("./auth");
const mongo = require("./mongo");
const AWSBucket = "cae-eportfolio";

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
      return res.send({ error: err });
    }
    console.log("[S3] File retrieved");
    res.send(data.Body);
  });
});

// Upload file to S3 and create database entry.
// AUTHENTICATION REQUIRED
s3router.post("/upload", auth, function (req, res, next) {
  console.log("[S3] Trying to upload file ");

  var busboy = new Busboy({ headers: req.headers });
  var hashName = "";
  busboy.on("finish", function () {
    var file = req.files.file;

    // Obtain hashed name for storage
    var md5sum = crypto.createHash("md5");
    md5sum.update(file.data);
    hashName = md5sum.digest("hex");

    var params = { Bucket: AWSBucket, Key: hashName, Body: file.data };
    s3.upload(params, function (err, s3res) {
      if (err) {
        console.log("[S3] Upload failed");
        res.status(500);
      } else {
        console.log("[S3] Upload success");
        mongo
          .postUpload(file.name, hashName, req.user.id)
          .then((success) => {
            console.log(success);
            res.status(200).json({ fileUrl: hashName });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
  });

  req.pipe(busboy);
});

// Delete file from S3 and remove database entry.
s3router.post("/remove/:file", auth, function (req, res, next) {
  console.log(
    "[S3] Trying to remove file " + req.params.file + " owned by " + req.user.id
  );

  // TODO: check if req.user.id matches file owner before deleting
  if (!validateFileOwner(req.user.id, req.params.file))
  {
    res.send(null);
  }

  var params = { Bucket: AWSBucket, Key: req.params.file };
  s3.deleteObject(params, (err, res) => {
    if (err) console.log("[S3] File deletion failed.");
    else {
      console.log("[S3] File deletion successful.");
      mongo.postDelete(req.params.file, req.user.id);
    }
  });

  // TODO: proper res.send
  res.send(null);
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
 * 
 * @returns {Boolean} 
 */
const validateFileOwner = (userID, userFile) => {
  mongo.fetchProfileByUID(userID, (err, profile) => {
    if (err || !profile)
    {
      console.log("[S3] Permission to modify file denied.");
      return false;
    }
    else if (profile.filesAndDocs.filter(file => file.url === userFile)) 
    {
      console.log("[S3] Permission validated.");
      return true;
    }
    else
    {
      console.log("[S3] User does not own file.");
      return false;
    }
  });
};

module.exports = s3router;
