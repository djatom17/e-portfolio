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
import { Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
