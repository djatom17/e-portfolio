/**
 * Handles requests for sensitive account information and security.
 *
 * @file API for account-related interactions.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires express,bcryptjs,jsonwebtoken,./auth,config,mongodb,
 *  google-auth-library,models.User,models.UserProfile.
 * @exports userrouter
 */
const express = require("express");
const userrouter = express.Router();
const bcrypt = require("bcryptjs");
const config =
  process.env.NODE_ENV === "development" ? require("config") : null;
const jwtSecret =
  process.env.NODE_ENV === "development"
    ? config.get("jwtSecret")
    : process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const { ObjectID } = require("mongodb");
const { OAuth2Client } = require("google-auth-library");
const authClient = new OAuth2Client(
  "84279213789-nla6f8u88716cs7t53iikugg977laq92.apps.googleusercontent.com"
);

// User Model
const User = require("../../models/User");

// User to profile mapping Model
const UserProfile = require("../../models/UserProfile");
const Profile = require("../../models/Profile");
const ContactSchema = require("../../models/Contact");

/**
 * Authenticates a user when logging in.
 *
 * "email" and "password" should be valid attributes in req.body.
 */
userrouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    // Bad request
    return res.status(400).json({
      error: "Please enter all fields.",
    });
  }

  //Ensure email is linked to a user.
  User.findOne({
    email,
  }).then((user) => {
    if (!user)
      return res.status(401).json({
        error: "Invalid credentials.",
      });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(401).json({
          error: "Invalid credentials.",
        });

      // Correct login details
      // Attach corresponding profile ID to the "user" in the state.
      UserProfile.findOne({ uid: user.id })
        .lean()
        .then((userMap) => {
          jwt.sign(
            {
              id: user.id,
            },
            jwtSecret,
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) return res.status(500).json({ error: err });
              res.status(200).json({
                token,
                user: {
                  _id: user.id,
                  name: user.name,
                  email: user.email,
                  pid: userMap.pid,
                },
              });
              //Redirect to user's profile after valid token signoff
              return res.redirect("/my-profile");
            }
          );
        });
    });
  });
});

// Uses token provided by a Google login to maintain login state.
userrouter.post("/google-login", (req, res, next) => {
  console.log("[AUTH] Attempting login with Google token");
  const { tokenId } = req.body;
  authClient
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "84279213789-nla6f8u88716cs7t53iikugg977laq92.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.getPayload();
      if (email_verified) {
        User.findOne({ email })
          .then((user) => {
            if (!user)
              return res.status(401).json({
                error: "User does not exist.",
              });

            UserProfile.findOne({ uid: user.id })
              .lean()
              .then((userMap) => {
                jwt.sign(
                  {
                    id: user.id,
                  },
                  jwtSecret,
                  {
                    expiresIn: 3600,
                  },
                  (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                      token,
                      user: {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        pid: userMap.pid,
                      },
                    });
                  }
                );
              });
          })
          .catch((err) => console.log(err));
      } else {
        res.status(401).json({ error: "Email not verified with Google." });
      }
    })
    .catch((err) => console.log(err));
});

// (PROTOTYPE)
// Registers new user and gives them a token.
userrouter.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    // Bad request
    return res.status(400).json({
      error: "Please enter all fields.",
    });
  }

  // Check for existing user
  User.findOne({
    email,
  }).then((user) => {
    if (user)
      return res.status(401).json({
        error: "User already exists.",
      });

    // If indeed new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          const firstSpaceIndex = user.name.indexOf(" ");
          const firstName = user.name.substr(0, firstSpaceIndex);
          const lastName = user.name.substr(firstSpaceIndex + 1);
          bcrypt.hash(user.email, salt, (err, hashedEmail) => {
            const newProfile = new Profile({
              firstName: firstName,
              lastName: lastName,
              linkToProfile: encodeURIComponent(hashedEmail.replace(".", "")),
              contact: {
                email: user.email,
              },
            });
            newProfile.save().then((profile) => {
              const newUserProfile = new UserProfile({
                uid: user.id,
                pid: profile.id,
              });
              newUserProfile.save().then((userProfile) => {
                jwt.sign(
                  {
                    id: user.id,
                  },
                  jwtSecret,
                  {
                    expiresIn: 3600,
                  },
                  (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                      token,
                      profile: profile,
                      user: {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        pid: profile.id,
                      },
                    });
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

/**
 * Get user data, and attach their corresponding profile ID.
 */
userrouter.get("/user", auth, (req, res, next) => {
  User.findById(req.user.id)
    .select("-password")
    .lean()
    .then((user) => {
      UserProfile.findOne({ uid: req.user.id })
        .lean()
        .then((userMap) => {
          res.status(200).json({ ...user, pid: userMap.pid });
        });
    });
});

/**
 * Handles POST request for changing a user's account password.
 *
 * Stores password changes as hash, if any.
 * Pushes hash onto User database.
 *
 * Successful operation:
 * Status code 204
 */
userrouter.post("/change-password", auth, (req, res, next) => {
  //Generate password hash to be stored.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    //Hash password with salt.
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      req.body.password = hash;
      //Push changes to User database.
      User.findOneAndUpdate(
        { _id: ObjectID(req.user.id) },
        { $set: req.body },
        { returnNewDocument: true, useFindAndModify: false }
      ).then((updated_user) => {
        if (!updated_user) {
          return res
            .status(500)
            .json({ error: "[Mongoose] User update unsuccessful." });
        }
        //Successful operation
        else {
          console.log("[Mongoose] Successfully posted updates to MongoDB.");
          res.status(204).json("Password changed successfully.");
        }
      });
    });
  });
});

userrouter.post("/change-email", auth, (req, res, next) => {
  User.findOneAndUpdate(
    { _id: ObjectID(req.user.id) },
    { $set: req.body },
    { returnNewDocument: true, useFindAndModify: false }
  ).then((updated_user) => {
    if (!updated_user) {
      return res
        .status(500)
        .json({ error: "[Mongoose] User update unsuccessful." });
    } else {
      console.log("[Mongoose] Successfully posted updates to MongoDB.");
      res.status(204).json("Email changed successfully.");
    }
  });
});

/**
 * Checks if email change request exists for another user.
 *
 * (PROTOTYPE)
 * Intended as a middleware for checking distinct emails.
 * Checks if email exists in user database before calling next.
 * Rejects the update if conflicting email found.
 *
 * @function [checkEmail]
 * @param {JSON} req Request body.
 * @param {JSON} res Response body.
 * @param {} next Method for next route.
 */
function checkEmail(req, res, next) {
  //If an email change is in the request body, performs check.
  if ("email" in req.body) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log("[Mongoose] Error in fetching user account.");
        return res.status(500).json({ error: err });
      }
      //Found conflicting email.
      if (user) {
        console.log("Conflicting email.");
        delete req.body.email;
        return res.status(409).send(req.body);
      }
      //Successful operation
      else {
        next();
      }
    });
  }
  //No email change requested.
  else {
    next();
  }
}

module.exports = userrouter;
