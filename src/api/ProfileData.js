/**
 * @file Functions for front-end to route API calls
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires react,axios
 * @exports getProfile,getElements,getName,getCurrJob
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
  axios.get("/info/p/" + profileID).then((res) => {
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

/**
 * Retrieves a given profile's work role and Place of Employment.
 * 
 * ASSUMES LAST ELEMENT IN WORKHISTORY ARRAY AS MOST RECENT JOB.
 * Checks if the given profile has any workHistory, if 0, return null.
 * Else, return the split String of the last entry in workHistory array.
 * 
 * @function [getCurrJob]
 * @see Models.Profile,Array.prototype.split
 
 * @param {Object} profile - Profile JSON Schema
 * 
 * @returns {?Array} [role, workplace] or null 
 */
export function getCurrJob(profile) {
  //If the profile does not have any work history, returns null
  if (!profile.workHistory.length) return null;
  else {
    const work_str = profile.workHistory[profile.workHistory.length - 1];
    return work_str.split("@ ");
  }
}
