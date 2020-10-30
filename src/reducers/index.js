import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
});
