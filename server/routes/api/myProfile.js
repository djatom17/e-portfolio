const express = require("express");
const profilerouter = express.Router();
const auth = require("./auth");
const fetchProfileByUID = require('./mongo').fetchProfileByUID;

//GET a dynamic user profile page (After login and auth)
profilerouter.get("/", auth, (req, res, next) => {
    var profile = fetchProfileByUID(req.user.id);
    res.send(profile);
});

//GET a current instance of user's profile data on MongoDB 
profilerouter.get("/edit", auth, (req, res, next) => {
    return null;
});

//POST changes to profile data onto MongoDB
profilerouter.post("/edit", auth, (req, res, next) => {
    return null;
});

module.exports = profilerouter;