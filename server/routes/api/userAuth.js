const express = require("express");
const userrouter = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

// User Model
const User = require("../../models/User");

// Authenticate/login user
userrouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    // Bad request
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials." });

      // Correct login details
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// Registers new user and gives them a token.
userrouter.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    // Bad request
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists." });

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
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// Get user data
userrouter.get("/user", auth, (req, res, next) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = userrouter;
