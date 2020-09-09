var express = require('express');
var router = express.Router();
const s3api = require('../routes/api/s3');
const AWSconfig = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // download the file via aws s3 here
  var fileKey = 'Motivational Model Diagram.png';

  console.log('Trying to download file', fileKey);
  var AWS = require('aws-sdk');

  var s3 = new AWS.S3({
    accessKeyId: AWSconfig.iamUser,
    secretAccessKey: AWSconfig.iamSecret
  });

  var options = {
      Bucket    : 'cae-eportfolio',
      Key    : fileKey,
  };

  s3.getObject(options, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

  // No error happened
  // Convert Body from a Buffer to a String

    let objectData = data.Body.toString('base64'); // Use the encoding necessary
    let image="<img src='data:image/jpeg;base64," + objectData + "'" + "/>";
    let startHTML="<html><body></body>";
    let endHTML="</body></html>";
    let html=startHTML + image + endHTML;
    res.send(html);
    //res.send(objectData);
  });
});

module.exports = router;
