const express = require("express");
const profilerouter = express.Router();
const auth = require("./auth");
const UserProfile = require('../../models/UserProfile');
const Profile = require('../../models/Profile');

//GET a dynamic user profile page (After login and auth)
profilerouter.get("/", auth, (req, res, next) => {
    //Find authenticated user's profile from DB
    UserProfile.findOne({
            "uid": req.user.id
        })
        .then((userMap) => {
            //Find profile mapped from userID given from auth
            Profile.findById(userMap.pid, (err, profile) => {
                if (err) throw err;
                console.log(profile.toString());
                res.send(profile);
            });
        });

});

module.exports = profilerouter;