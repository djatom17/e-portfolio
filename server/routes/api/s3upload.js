var express = require('express');
var s3u = express.Router();

s3u.get('/s3proxy', function(req, res, next){
    // download the file via aws s3 here
   //var fileKey = 'aws_test.txt';

   //console.log('Trying to download file', fileKey);
   //var AWS = require('aws-sdk');
   ////AWS.config.update(
   ////  {
   ////    accessKeyId: "....",
   ////    secretAccessKey: "...",
   ////    region: 'ap-southeast-2'
   ////  }
   ////);
   //var s3 = new AWS.S3({
   //    accessKeyId: AWSconfig.iamUser,
   //    secretAccessKey: AWSconfig.iamSecret
   //  });
   //var options = {
   //    Bucket    : 'cae-eportfolio',
   //    Key    : fileKey,
   //};

   //res.attachment(fileKey);
   //var fileStream = s3.getObject(options).createReadStream();
   //fileStream.pipe(res);
    res.render('index', { title: 'Express'});
});

module.exports = s3u;