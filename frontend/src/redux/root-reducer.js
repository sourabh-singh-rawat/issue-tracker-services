import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { issueReducer } from "./issue/issue.reducer";
import { projectReducer } from "./project/project.reducer";
import { snackbarReducer } from "./snackbar/snackbar.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  issue: issueReducer,
  snackbar: snackbarReducer,
});
