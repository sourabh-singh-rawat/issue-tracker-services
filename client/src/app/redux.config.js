import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api.config.js";

import authSlice from "../features/auth/auth.slice";
import collaboratorListSlice from "../features/collaborator-list/collaborator-list.slice";
import issueSlice from "../features/issue/issue.slice";
import issueCommentsSlice from "../features/issue-comments/issue-comments.slice";
import issueListSlice from "../features/issue-list/issue-list.slice";
import issueTasksSlice from "../features/issue-tasks/issue-tasks.slice";
import profileSlice from "../features/profile/profile.slice";
import projectSlice from "../features/project/project.slice";
import projectListSlice from "../features/project-list/project-list.slice";
import snackbarReducer from "../features/snackbar.reducer";
import taskListSlice from "../features/task-list/task-list.slice.js";
import teamSlice from "../features/team/team.slice";
import teamListSlice from "../features/team-list/team-list.slice";

const storeConfig = {
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    collaboratorList: collaboratorListSlice,
    issue: issueSlice,
    issueComments: issueCommentsSlice,
    issueList: issueListSlice,
    issueTasks: issueTasksSlice,
    profile: profileSlice,
    project: projectSlice,
    projectList: projectListSlice,
    snackbar: snackbarReducer,
    taskList: taskListSlice,
    team: teamSlice,
    teamList: teamListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(logger),
};

export const store = configureStore(storeConfig);
