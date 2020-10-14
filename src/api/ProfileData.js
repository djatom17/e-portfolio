/**
 * @file Functions for front-end to route API calls
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires react,axios
 * @exports getProfile,getElements,getName,updateProfile
 */
import React from "react";
import axios from "axios";

/**
 * Handles API calls to fetch data of a specified profile
 *
 * FETCHED DATA IS NULL IF PROFILE DOES NOT EXIST.
 * Calls axios to dispatch backend to make GET request to fetch requested
 * profile's data stored in MongoDB.
 *
 * @function [getProfile]
 * @see Models.Profile
 *
 * @callback Requester~requestCallback
 * @param {string} profileID - The ObjectID String of profile to get.
 * @param {Requester~requestCallback} callback - Handles callback for response.
 */
export function getProfile(profileID, callback) {
  axios.get("/api/mongo/p/" + profileID).then((res) => {
    return callback(res.data);
  });
}

/**
 * Wraps all items in an array with <p /> tags.
 *
 * Maps over all elements in array and creates new array of modified items.
 *
 * @function [getElements]
 * @param {Object[]} lst - Array of Objects.
 *
 * @returns {Object[]} Array of mapped Objects, wrapped in text tag.
 */
export function getElements(lst) {
  if (lst) {
    return lst.map((item, index) => <p>{item}</p>);
  }
}

/**
 * Gets the full name of a profile in the format "John Smith".
 *
 * Calls firstName and lastName in given profile and concatenate.
 *
 * @function [getName]
 * @see Models.Profile
 *
 * @param {Object} profile - Profile JSON Schema
 *
 * @returns {String} Full name (Firstname Lastname).
 */
export function getName(profile) {
  if (profile) {
    return profile.firstName + " " + profile.lastName;
  }
}

export function updateProfile(pid, profileChanges, token) {
  if (
    Object.keys(profileChanges).length !== 0 &&
    profileChanges.constructor === Object
  ) {
    axios
      .post("/api/mongo/p-update/" + pid, profileChanges, {
        headers: { "x-auth-token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        if (!res) console.log("Edit unsuccessful.");
        else {
          console.log("Edit successful, profile saved.");
        }
      });
  }
}
