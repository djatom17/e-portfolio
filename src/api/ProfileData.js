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

export function getBar(profile) {
  if (profile.keySkills) {
    return profile.keySkills.map((item, index) => (
      <SkillBar
        skills={[{ type: item.toString(), level: 85 }]}
        colors={{
          bar: "#01b6c7",
          title: { text: "#fff", background: "#adadad" },
        }}
      />
    ));
  }
}

export function getFileSrc(location) {
  return "/api/file/dl/" + location;
}
