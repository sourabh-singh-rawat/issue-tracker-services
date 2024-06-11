import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../../api/api.config";
import authSlice from "../../features/auth/auth.slice";
import issueListSlice from "../../features/issue-list/issue-list.slice";
import issueSlice from "../../features/issue/issue.slice";
import messageBarSlice from "../../features/message-bar/message-bar.slice";
import profileSlice from "../../features/profile/profile.slice";
import projectListSlice from "../../features/project-list/project-list.slice";
import projectSlice from "../../features/project/project.slice";
import taskListSlice from "../../features/task-list/task-list.slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    issue: issueSlice,
    issueList: issueListSlice,
    profile: profileSlice,
    project: projectSlice,
    projectList: projectListSlice,
    messageBar: messageBarSlice,
    taskList: taskListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
