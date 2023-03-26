import { usersReducer } from "./usersReducer";
import { alertReducer } from "./alertReducer";
import { blogReducer } from "./blogReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: usersReducer,
  alert: alertReducer,
  blog: blogReducer,
});
