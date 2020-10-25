/**
 * Contains middleware related to autherisations and token validation.
 *
 * @file Middleware for authenticating user tokens.
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires config,jsonwebtoken
 * @exports auth
 */

const jwtSecret =
  process.env.NODE_ENV === "development"
    ? require("config").get("jwtSecret")
    : process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

/**
 * Middleware for validating auth token for core functions.
 *
 * Intended to be the first middleware to execute in an API call.
 * Checks user token in request body params and validates it /check
 * expiry. Passes to next route after validation successful.
 *
 * @function [auth]
 * @param {Object} req Request body in JSON.
 * @param {Object} res Response body in JSON.
 * @param {} next Handles next route after middleware.
 */
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({
      error: "No token, authorisation denied",
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    // Add user from payload
    req.user = decoded;
    //Successful operation
    next();
  } catch (e) {
    res.status(401).json({
      error: "Token is not valid.",
    });
  }
}

module.exports = auth;
