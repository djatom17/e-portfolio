/**
 * Aggregrates backend APIs into core frontend function calls.
 *
 * @file Functions for front-end to route API calls
 * @author Team Ctrl-Alt-Elite
 * @copyright This material is made available to you by or on behalf
 * of the University of Melbourne.
 * @requires react,axios,antd
 * @exports getProfile,getElements,getName,updateProfile,changePassword
 */
import React from "react";
import axios from "axios";
import { Typography, Button } from "antd";
import { DeleteOutlined, PaperClipOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

export function getFileLink(url) {
  return "/api/file/dl/" + url;
}

export function getFiles(files) {
  if (files) {
    return files.map((file) => (
      <div>
        <Button onClick={() => getFileDownload(file.name, file.url)}>
          <PaperClipOutlined />
          {file.name}
        </Button>
      </div>
    ));
  }
}

// Profile picture changing
// When the user selects a new image, preview it on the thumbnail
export function handlePFPChange(file) {
  this.setState({
    profile: { ...this.state.profile, image: file.preview },
    profileChanges: { ...this.state.profileChanges, image: file },
  });
}

export function getFileDownload(filename, fileLocation) {
  axios.get(fileLocation, { responseType: "blob" }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  });
}

// Handles the change of the file list when something new is uploaded.
export function onProjectsChange(name, filename, url, description) {
  this.setState({
    profile: {
      ...this.state.profile,
      filesAndDocs: [
        ...this.state.profile.filesAndDocs,
        { name, filename, url, description },
      ],
    },
  });
}

export function onCertificatesChange(name, filename, url, description) {
  this.setState({
    profile: {
      ...this.state.profile,
      certificates: [
        ...this.state.profile.certificates,
        { name, filename, url, description },
      ],
    },
  });
}

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

/**
 * Pushes user profile changes onto the database.
 * 
 * Will not perform updates if profileChanges is empty.
 * 
 * @param {String} pid Profile ID of affected profile.
 * @param {Object} profileChanges Profile JSON schema of attribute changes.
 * @param {String} token Auth token of user.
 */
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

/**
 * Changes user password on the users database.
 * 
 * Does not refresh user session nor log users out.
 * Will only perform update operations if newPassword is not empty.
 * newPassword should follow password attribute of User schema.
 * 
 * @function [changePassword]
 * @see userAuth.js
 * @param {Object} newPassword Password to be changed to.
 * @param {String} token Auth token of user.
 */
export function changePassword(newPassword, token) {
  if (
    Object.keys(newPassword).length !== 0 &&
    newPassword.constructor === Object
  ) {
    axios
      .post("/api/auth/change-password", newPassword, {
        headers: { "x-auth-token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  }
}
/**
 * Changes user email on the users database.
 *
 * Does not refresh user session nor log users out.
 * Will only perform update operations if newEmail is not empty.
 * newEmail should follow email attribute of User schema.
 *
 * @function [changeEmail]
 * @see userAuth.js
 * @param {Object} newEmail Email to be changed to.
 * @param {String} token Auth token of user.
 */
export function changeEmail(newEmail, token) {
  if (Object.keys(newEmail).length !== 0 && newEmail.constructor === Object) {
    axios
      .post("/api/auth/change-email", newEmail, {
        headers: { "x-auth-token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  }
}

// Text Editor
export function setEditableStr(property, str) {
  var addChange = {};
  addChange[property] = str;
  console.log(str);
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
//Object Editor
export function setEditableObject(property, subproperty, str, obj) {
  var addChange = {};
  addChange[property] = obj;
  addChange[property][subproperty] = str;
  console.log({ ...this.state.profileChanges, ...addChange });
  this.setState({
    profileChanges: { ...this.state.profileChanges, ...addChange },
    profile: { ...this.state.profile, ...addChange },
  });
}

// Nested Object Editor
export function setNestedEditableObject(property, sub, sub2, str, obj, obj2) {
  var addChange = {};
  addChange[property] = obj;
  addChange[property][sub] = obj2;
  addChange[property][sub][sub2] = str;
  // this.setState({ someProperty: { ...this.state.someProperty, flag: false} });
  console.log({ ...this.state.profileChanges, ...addChange });
  this.setState({
    profileChanges: { ...this.state.profileChanges, ...addChange },
    profile: { ...this.state.profile, ...addChange },
  });
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

// callback function that changes lists in this.state.profile
export function changeList(data, fieldName) {
  let { profile, profileChanges } = this.state;
  profile[fieldName] = data;
  profileChanges[fieldName] = [...profile[fieldName]];

  this.setState({
    profile,
    profileChanges,
  });
  console.log(this.state.profile);
}

//Modal  helper Functions
// delete ?
export function showModal() {
  this.setState({
    visible: true,
  });
}

export function settingsCancel() {
  this.setState({ settingsVisible: false });
}

export function changeLayout(str, info) {
  this.setState({ layout: str });
}

export function themeCustom(theme) {
  var primCol;
  var secCol;
  switch (theme) {
    case "1":
      primCol = "#e9e9e9";
      secCol = "#4273cf";
      break;
    case "2":
      primCol = "#f0fffd";
      secCol = "#6b2240";
      break;
    case "3":
      primCol = "#e3ffea";
      secCol = "#178534";
      break;
    case "4":
      primCol = "#ffe8e8";
      secCol = "#d44e4e";
      break;
    default:
      primCol = "white";
      secCol = "#e5e5e5";
      break;
  }
  this.setState({ primaryColour: primCol, secondaryColour: secCol });
}

// End of modal Functions

// Editable Card List Functions: Add, Delete and Edit

/**
 *
 * Updates the values given object in the profile state variable for a card
 * by removing elements as directed by the UI
 *
 * This change is passed on to the database to be updated
 *
 * @function [handleCloseCard]
 * @param {String} fieldName - String name of the object in profile being modified e.g. "workplace".
 * @param {Object} item - the object value to be deleted
 * @param {String} keyFieldName - String name of the field to be used for comparison
 *
 */
export function handleCloseCard(fieldName, item, keyFieldName) {
  const field = this.props.data.filter(function (value) {
    return value[keyFieldName] != item[keyFieldName];
  });
  let data = this.props.data;
  data = field;
  this.setState({
    editInputIndex: -1,
    editInputValue: "",
  });
  this.props.changeList(data, fieldName);
  // this.setState({ editInputIndex: -1, editInputValue: "" });
}

// End Card List Functions

// Editable List Helper Functions: Add, Delete and Edit.

/**
 *
 * Sets inputValue (new) to be text from input event
 *
 * @function [handleInputChange]
 * @param {event} e - Input Event.
 *
 */
export function handleInputChange(e) {
  this.setState({ inputValue: e.target.value });
}

/**
 *
 * Sets editInputValue (existing) to be text from input event
 *
 * @function [handleEditInputChange]
 * @param {event} e - Input Event.
 *
 */
export function handleEditInputChange(e) {
  this.setState({ editInputValue: e.target.value });
}

/**
 *
 * Updates the values given fieldName in the profile state variable
 * by adding new elements as directed the UI
 *
 * This change is passed on to the database to be updated
 *
 * @function [handleInputConfirm]
 * @param {String} fieldName - String name of the list in profile being modified e.g. "keySkills".
 *
 */
export function handleInputConfirm(fieldName) {
  let { inputValue } = this.state;
  let data = this.props.data;

  // confirm if array, and item to be add is not empty
  // checks for duplicates, but maybe not do that here (?)
  if (inputValue && data && data.indexOf(inputValue) === -1) {
    data = [...data, inputValue];
  }
  this.setState({
    inputVisible: false,
    inputValue: "",
  });
  this.props.changeList(data, fieldName);
}

/**
 *
 * Updates the values given fieldName in the profile state variable
 * by removing elements as directed by the UI
 *
 * This change is passed on to the database to be updated
 *
 * @function [handleCloseTag]
 * @param {String} fieldName - String name of the list in profile being modified e.g. "keySkills".
 * @param {String} removedTag - String value of the item to be removed from the list  e.g "Machine learning"
 *
 */
export function handleCloseTag(fieldName, removedTag) {
  const field = this.props.data.filter((tag) => tag !== removedTag);
  let data = this.props.data;
  data = field;
  this.setState({
    editInputIndex: -1,
    editInputValue: "",
  });
  this.props.changeList(data, fieldName);
  // this.setState({ editInputIndex: -1, editInputValue: "" });
}

/**
 *
 * Updates the values given fieldName in the profile state variable
 * by editing elements as directed by the UI
 *
 * This change is passed on to the database to be updated
 *
 * @function [handleEditInputConfirm]
 * @param {String} fieldName - String name of the list in profile being modified e.g. "keySkills".
 *
 */
export function handleEditInputConfirm(fieldName) {
  let { editInputValue, editInputIndex } = this.state;
  let data = this.props.data;

  var newTags = [...data];
  newTags[editInputIndex] = editInputValue;
  data = newTags;
  // profileChanges[fieldName] = newTags;

  this.setState({
    editInputIndex: -1,
    editInputValue: "",
  });

  this.props.changeList(data, fieldName);
}

// helper function to track input
export function saveInputRef(input) {
  this.input = input;
}

// helper function to track input
export function saveEditInputRef(input) {
  this.editInput = input;
}

/**
 *
 * Returns a formatted version of given object where specified date is converted to moment
 *
 *
 * @function [formatDate]
 * @param {object} obj the object where the date is to modified
 * @param {String} inFieldName - String name of input date field
 * @param {String} outFieldName - String name of output date field (to be added to the object)
 *
 */
export function formatDate(obj, inFieldName, outFieldName) {
  var moment = require("moment");
  var moment_date = moment(obj[inFieldName]);
  obj[outFieldName] = moment_date;
  return obj;
}

/**
 *
 * Returns a functional delete button for any item in a list
 *
 * Intended to be only used when a profile is in edit mode
 *
 * @function [deleteButt]
 * @param {String} fieldName - String name of the list on which the delete button will be used e.g. "keySkills".
 * @param {String} item - String value of the item to be removed from the list e.g "Machine learning"
 *
 */
export function deleteButt(fieldName, item) {
  return (
    <Button type="link" onClick={() => this.handleCloseTag(fieldName, item)}>
      <DeleteOutlined />
    </Button>
  );
}
//End of Adding , Deleting and Editing of data helper functions

/**
 *
 * Switches between desktop viewing and mobile viewing modes
 *
 * @function [resize]
 *
 */
export function resize() {
  this.setState({ mobileView: window.innerWidth <= 760 });
}
