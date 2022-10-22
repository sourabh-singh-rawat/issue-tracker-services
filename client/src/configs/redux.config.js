import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { apiSlice } from "./api.config.js";

import authSlice from "../features/auth/auth.slice";
import collaboratorListSlice from "../features/collaboratorList/collaboratorList.slice";
import issueSlice from "../features/issue/issue.slice";
import issueCommentsSlice from "../features/issueComments/issueComments.slice";
import issueListSlice from "../features/issueList/issueList.slice";
import issueTasksSlice from "../features/issueTasks/issueTasks.slice";
import projectSlice from "../features/project/project.slice";
import projectListSlice from "../features/projectList/projectList.slice";
import profileSlice from "../features/profile/profile.slice";
import teamSlice from "../features/team/team.slice";
import teamListSlice from "../features/teamList/teamList.slice";
import snackbarReducer from "../features/snackbar.reducer";

const storeConfig = {
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    collaboratorList: collaboratorListSlice,
    issue: issueSlice,
    issueComments: issueCommentsSlice,
    issueTasks: issueTasksSlice,
    issueList: issueListSlice,
    project: projectSlice,
    projectList: projectListSlice,
    profile: profileSlice,
    team: teamSlice,
    teamList: teamListSlice,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(logger),
};

export const store = configureStore(storeConfig);
