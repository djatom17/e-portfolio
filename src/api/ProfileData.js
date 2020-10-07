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
import { Typography } from "antd";
const { Paragraph } = Typography;

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

export function updateProfile(pid, profileChanges, token) {
  if (
    Object.keys(profileChanges).length !== 0 &&
    profileChanges.constructor === Object
  ) {
    axios
      .post("/info/p-update/" + pid, profileChanges, {
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

// Text Editor
export function setEditableStr(property, str) {
  var addChange = {};
  addChange[property] = str;
  this.setState({
    profileChanges: { ...this.state.profileChanges, ...addChange },
    profile: { ...this.state.profile, ...addChange },
  });
}

//Text Editor in arrays
export function setEditableStrArr(property, index, str) {
  var temp = { ...this.state.profile };
  temp[property][index] = str;
  this.setState({ profile: temp });
}

//Currently used for skills in prof 5
export function getElementsNew(lst, property) {
  if (lst) {
    return lst.map((item, index) => (
      <Paragraph
        className="psize"
        editable={
          this.state.isMyProfile && this.state.canEdit
            ? {
                onChange: (e) => this.setEditableStrArr(property, index, e),
              }
            : false
        }
      >
        {item}
      </Paragraph>
    ));
  }
}

//Handling of Edit Button
export function handleEditButtonClick() {
  // Make changes reflect on database
  updateProfile(
    this.state.profile._id,
    this.state.profileChanges,
    this.props.token
  );
  this.setState({
    canEdit: !this.state.canEdit,
    profileChanges: {},
  });
}

//Modal  helper Functions
export function showModal() {
  this.setState({
    visible: true,
  });
}

export function handleOk(num, info) {
  this.setState({ loading: true });
  setTimeout(() => {
    this.setState({ loading: false, visible: false });
  }, 3000);

  updateProfile(this.state.profile._id, { layout: num }, this.props.token);
  window.location.reload();
}

export function handleCancel() {
  this.setState({ visible: false });
}

export function changeLayout(str, info) {
  this.setState({ layout: str });
}
// End of modal Functions
