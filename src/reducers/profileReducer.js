import { SHOW_SETTINGS, HIDE_SETTINGS } from "../actions/types";

const initialState = {
  showSettings: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SETTINGS:
      console.log("true");
      return {
        showSettings: true,
      };
    case HIDE_SETTINGS:
      console.log("false");
      return {
        showSettings: false,
      };
    default:
      console.log("default");
      return state;
  }
}
