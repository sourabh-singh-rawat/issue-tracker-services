import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
import { attachmentApi } from "../../api/codegen/rest/attachment.api";
import authSlice from "../../features/auth/auth.slice";
import issueListSlice from "../../features/issue-list/issue-list.slice";
import issueSlice from "../../features/issue/issue.slice";
import profileSlice from "../../features/profile/profile.slice";
import projectListSlice from "../../features/project-list/project-list.slice";
import taskListSlice from "../../features/task-list/task-list.slice";
import workspaceSlice from "../../features/workspace/workspace.slice";

export const store = configureStore({
  reducer: {
    [attachmentApi.reducerPath]: attachmentApi.reducer,
    auth: authSlice,
    workspace: workspaceSlice,
    issue: issueSlice,
    issueList: issueListSlice,
    profile: profileSlice,
    projectList: projectListSlice,
    taskList: taskListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(attachmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
