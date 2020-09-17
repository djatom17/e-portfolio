var express = require('express');
var mongorouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cae-aman:EOvQly0wRkmob7z8@cluster0.6wjtw.mongodb.net/cae-users?retryWrites=true&w=majority&authSource=admin";


mongorouter.get('/profiles', function(req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true });
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

module.exports = mongorouter;