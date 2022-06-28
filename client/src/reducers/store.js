import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issue.reducer";
import issueListReducer from "./issueList.reducer";
import issueOptionsReducer from "./issueOptions.reducer";
import projectReducer from "./project.reducer";
import projectListReducer from "./projectList.reducer";
import projectOptionsReducer from "./projectOptions.reducer";
import snackbarReducer from "./snackbar.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import teamListReducer from "./teamList.reducer";
import memberListReducer from "./memberList.reducer";

export const store = configureStore({
  reducer: {
    issue: issueReducer,
    issueList: issueListReducer,
    issueOptions: issueOptionsReducer,
    project: projectReducer,
    projectOptions: projectOptionsReducer,
    projectList: projectListReducer,
    memberList: memberListReducer,
    snackbar: snackbarReducer,
    user: userReducer,
    team: teamReducer,
    teamList: teamListReducer,
  },
  middleware: [logger],
});
