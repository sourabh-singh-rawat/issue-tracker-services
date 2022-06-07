import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { issueReducer } from "./issue/issue.reducer";
import { projectReducer } from "./project/project.reducer";
import { snackbarReducer } from "./snackbar/snackbar.reducer";
import { issueListReducer } from "./issues-list/issue-list.reducer";
import { projectListReducer } from "./project-list/project-list.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  issue: issueReducer,
  issueList: issueListReducer,
  project: projectReducer,
  projectList: projectListReducer,
  snackbar: snackbarReducer,
});
