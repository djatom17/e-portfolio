var express = require('express');
var s3router = express.Router();
const AWSconfig = require('../../config');
const AWS = require('aws-sdk');
const AWSBucket = 'cae-eportfolio';
const s3 = new AWS.S3({
  accessKeyId: AWSconfig.iamUser,
  secretAccessKey: AWSconfig.iamSecret
});

//async function getImage()
//{
//  var fileKey = 'Motivational Model Diagram.png';
//
//  console.log('Trying to download file', fileKey);
//  var AWS = require('aws-sdk');
//
//  var options = {
//      Bucket    : 'cae-eportfolio',
//      Key    : fileKey,
//  };
//
//  var res = await s3.getObject(options).promise();
//  var img = res.Body.toString('base64');
//  
//  return img;
//}

s3router.get("/:imageId", function(req, res, next) {
  var params = { Bucket: AWSBucket, Key: req.params.imageId };
  console.log("Trying to get image", req.params.imageId);
  s3.getObject(params, function(err, data) {
    if (err) {
      return res.send({ error: err });
    }
    res.send(data.Body);
  });
});

module.exports = s3router;