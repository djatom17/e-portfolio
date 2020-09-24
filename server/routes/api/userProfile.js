const express = require("express");
const profilerouter = express.Router();
const auth = require("./auth");

profilerouter.get("/", auth, (req, res, next) => {});

module.exports = profilerouter;
