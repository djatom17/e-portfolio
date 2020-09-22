var express = require('express');
const { ObjectID } = require('mongodb');
var mongorouter = express.Router();
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cae-aman:EOvQly0wRkmob7z8@cluster0.6wjtw.mongodb.net/cae-users?retryWrites=true&w=majority&authSource=admin";

function createNewClient()
{
  return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
}

// Get all profiles
mongorouter.get('/profiles', function(req, res, next) {
    const client = createNewClient();
    console.log("Trying to get profiles from mongo");
    client.connect(err => {
        const collection = client.db("cae_users").collection("profiles");
        collection.find().toArray((err, profiles) => {
            client.close();
            if (err) {
              // if an error happens
              res.send("Error in GET req.");
            } else {
              // if all works
              res.send(profiles);
            }
        });
    });
});

// Get a specific profile based on ObjectID
mongorouter.get('/p/:ID', function(req, res, next) {
  const client = createNewClient();
  console.log("Trying to get " + req.params.ID + "from mongo");
  client.connect(err => {
      const collection = client.db("cae_users").collection("profiles");
      collection.find(ObjectID(req.params.ID)).toArray((err, p) => {
          client.close();
          if (err) {
            // if an error happens
            res.send("Error in GET req.");
          } else {
            // if all works
            res.send(p[0]);
          }
      });
  });
});

// Update a profile's information
// TODO: must be authorised to make this change.
mongorouter.post('/p-update/:ID', function(req, res, next){
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
mongorouter.post('/p-insert', function(req, res, next){
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