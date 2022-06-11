import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issue/issue.reducer";
import issueListReducer from "./issues-list/issue-list.reducer";
import projectReducer from "./project/project.reducer";
import projectListReducer from "./project-list/project-list.reducer";
import snackbarReducer from "./snackbar/snackbar.reducer";
import userReducer from "./user/user.reducer";

export const store = configureStore({
  reducer: {
    issue: issueReducer,
    issueList: issueListReducer,
    project: projectReducer,
    projectList: projectListReducer,
    snackbar: snackbarReducer,
    user: userReducer,
  },
  middleware: [logger],
});
