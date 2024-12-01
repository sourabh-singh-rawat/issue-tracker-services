import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../../features/auth/auth.slice";
import issueListSlice from "../../features/issue-list/issue-list.slice";
import issueSlice from "../../features/issue/issue.slice";
import messageBarSlice from "../../features/message-bar/message-bar.slice";
import profileSlice from "../../features/profile/profile.slice";
import projectListSlice from "../../features/project-list/project-list.slice";
import projectSlice from "../../features/project/project.slice";
import taskListSlice from "../../features/task-list/task-list.slice";
import workspaceSlice from "../../features/workspace/workspace.slice";
import { attachmentApi } from "../../api/codegen/rest/attachment.api";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    [attachmentApi.reducerPath]: attachmentApi.reducer,
    auth: authSlice,
    workspace: workspaceSlice,
    issue: issueSlice,
    issueList: issueListSlice,
    profile: profileSlice,
    project: projectSlice,
    projectList: projectListSlice,
    messageBar: messageBarSlice,
    taskList: taskListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(attachmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
