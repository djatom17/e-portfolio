// import axios from "axios";
// import { tokenConfig } from "./authActions";
// import { returnErrors } from "./errorActions";
import { SHOW_SETTINGS, HIDE_SETTINGS } from "./types";

export const showSettings = () => {
  return { type: SHOW_SETTINGS };
};

export const hideSettings = () => {
  return { type: HIDE_SETTINGS };
};
