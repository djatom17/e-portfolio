var express = require("express");
var s3router = express.Router();
var crypto = require("crypto");
const config = require("config");
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const auth = require("./auth");
const postUpload = require("./mongo").postUpload;
const AWSBucket = "cae-eportfolio";
const s3 = new AWS.S3({
  accessKeyId: config.get("iamUser"),
  secretAccessKey: config.get("iamSecret"),
});

// GET a specified file from the S3 bucket.
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
  busboy.on("finish", function () {
    var file = req.files.element2;

    // Obtain hashed name for storage
    var md5sum = crypto.createHash("md5");
    md5sum.update(file.data);
    var hashName = md5sum.digest("hex");

    var params = { Bucket: AWSBucket, Key: hashName, Body: file.data };
    s3.upload(params, function (err, res) {
      if (err) console.log("[S3] Upload failed");
      else {
        console.log("[S3] Upload success");
        postUpload(file.name, hashName, req.user.id);
      }
    });
  });

  req.pipe(busboy);
  res.redirect("back");
});

module.exports = s3router;
