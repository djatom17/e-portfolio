const AWSconfig = require('../../config');
const AWS = require('aws-sdk');
let s3 = new AWS.S3({
  accessKeyId: AWSconfig.iamUser,
  secretAccessKey: AWSconfig.iamSecret
});

//async function getImage()
//{
//  const data = s3.getObject({
//    Bucket: 'cae-portfolio',
//    Key: 'option5.png'
//  }).promise();
//  return data;
//}

//export default function encode(data)
//{
//  let buf = Buffer.from(data);
//  let base64 = buf.toString('base64');
//  return base64;
//}

module.exports = {
  getImage : async function()
  {
    //const data = s3.getObject({
    //  Bucket: 'cae-eportfolio',
    //  Key: 'aws_test.txt'
    //}).promise();
    //console.log(data);
    //return data;
    var file = 'aws_test.txt';
    console.log('Trying to download file');

    var s3 = new AWS.S3({});

    var options = {
        Bucket: 'cae-eportfolio',
        Key: file,
    };

    s3.getObject(options, function(err, data) {
      return data.Body;
    });
  },
  encode : function()
  {
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  }
};