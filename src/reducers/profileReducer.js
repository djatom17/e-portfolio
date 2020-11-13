import { SHOW_SETTINGS, HIDE_SETTINGS } from "../actions/types";

const initialState = {
  showSettings: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SETTINGS:
      return {
        showSettings: true,
      };
    case HIDE_SETTINGS:
      return {
        showSettings: false,
      };
    default:
      return state;
  }
}
