import React from "react";
import axios from "axios";

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

export function getCurrJob(profile) {
  if (!profile.workHistory.length) return null;
  if (profile.workHistory) {
    return profile.workHistory[0];
  }
}

export function getFileSrc(location) {
  return "/api/file/dl/" + location;
}
