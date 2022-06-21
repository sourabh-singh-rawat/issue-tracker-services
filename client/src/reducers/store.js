import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issue.reducer";
import issueListReducer from "./issue-list.reducer";
import projectReducer from "./project.reducer";
import projectListReducer from "./project-list.reducer";
import snackbarReducer from "./snackbar.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import teamListReducer from "./team-list.reducer";

export const store = configureStore({
  reducer: {
    issue: issueReducer,
    issueList: issueListReducer,
    project: projectReducer,
    projectList: projectListReducer,
    snackbar: snackbarReducer,
    user: userReducer,
    team: teamReducer,
    teamList: teamListReducer,
  },
  middleware: [logger],
});
