import React from "react";
import axios from "axios";
import SkillBar from "react-skillbars";

export function getProfile(profileID, callback) {
  axios.get("/info/p/" + profileID).then((res) => {
    return callback(res.data);
  });
}

export function getElements(lst) {
  if (lst) {
    return lst.map((item, index) => <p>{item}</p>);
  }
}

export function getName(profile) {
  if (profile) {
    return profile.firstName + " " + profile.lastName;
  }
}
