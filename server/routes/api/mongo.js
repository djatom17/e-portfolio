var express = require('express');
const { ObjectID } = require('mongodb');
var mongorouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cae-aman:EOvQly0wRkmob7z8@cluster0.6wjtw.mongodb.net/cae-users?retryWrites=true&w=majority&authSource=admin";

function createNewClient()
{
  return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
}

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

module.exports = mongorouter;