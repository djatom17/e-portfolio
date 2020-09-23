var express = require('express');
const { ObjectID } = require('mongodb');
var mongorouter = express.Router();
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const uri = require('config').get('mongoURI');
const auth = require('./auth');
const Profile = require('../../models/Profile');
const { callbackify } = require('util');

function createNewClient()
{
  return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
}

// Get all profiles
mongorouter.get('/profiles', function(req, res, next) {
  //get all profile entries from MongoDB.profiles
  Profile.find().lean().exec((err, profiles) => {
    if (err) return res.send("[Mongoose] Error in fetching profiles.");

    console.log("[Mongoose] Fetched all profiles.");
    res.send(profiles);
  });
});

// Get a specific profile based on ObjectID
mongorouter.get('/p/:ID', function(req, res, next) {
  console.log("[Mongoose] Fetching "+req.params.ID+" from mongo.");
  Profile.findOne(ObjectID(req.params.ID)).lean()
    .exec((err, profile) => {
      if (err) {
        res.send("[Mongoose] Error in fetching "+req.params.ID+" from mongo.");
      }
      console.log("[Mongoose] Fetched "+req.params.ID);
      res.send(profile);
    });
});

// Update a profile's information
// TODO: must be authorised to make this change.
mongorouter.post('/p-update/:ID', function(req, res, next){
  //Check if req.body fields are valid 
  //Post updates to mongo
  //???
  //Profit

  var elements = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    keySkills: req.body.keySkills,
    workHistory: req.body.workHistory,
    linkToProfile: req.body.linkToProfile,
    image: req.body.image
  };

  const client = createNewClient();
  console.log("Trying to send new information to mongo" + elements);
  client.connect(err => {
    assert.strictEqual(null, err);
    const collection = client.db("cae_users").collection("profiles");
    collection.updateOne({"_id": ObjectID(req.params.ID)}, {$set: elements}, function(err, result){
      assert.strictEqual(null, err);
      console.log("item updated");
      client.close();
    });
  });

  // TODO: change this to whatever pages the user was on before making an update
  res.redirect('/');
});

// Insert a profile's first-time login information.
// User exists, but profile itself does not, yet.
// TODO: must be authorised and logged in.
mongorouter.post('/p-insert', auth, function(req, res, next){
  var profile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    keySkills: req.body.keySkills,
    workHistory: req.body.workHistory,
    linkToProfile: req.body.linkToProfile,
    image: req.body.image
  };

  const client = createNewClient();
  console.log("Trying to send new information to mongo" + profile);
  client.connect(err => {
    assert.strictEqual(null, err);
    const collection = client.db("cae_users").collection("profiles");
    collection.insertOne(profile, function(err, result){
      assert.strictEqual(null, err);
      console.log("item inserted");
      client.close();
    });
  });

  // TODO: change this to preferably the user's brand-new profile page.
  res.redirect('/');
});

module.exports = mongorouter;