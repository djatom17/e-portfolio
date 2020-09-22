var express = require('express');
var s3router = express.Router();
const config = require('config');
const AWS = require('aws-sdk');
const AWSBucket = 'cae-eportfolio';
const s3 = new AWS.S3({
  accessKeyId: config.get('iamUser'),
  secretAccessKey: config.get('iamSecret')
});

s3router.get("/*", function(req, res, next) {
  var params = { Bucket: AWSBucket, Key: req.params[0] };
  console.log("Trying to get image", req.params[0]);
  s3.getObject(params, function(err, data) {
    if (err) {
      return res.send({ error: err });
    }
    res.send(data.Body);
  });
});

module.exports = s3router;