import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { attachmentApi } from "../../api/codegen/rest/attachment.api";
import profileSlice from "../../features/profile/profile.slice";
import workspaceSlice from "../../features/workspace/workspace.slice";

export const store = configureStore({
  reducer: {
    [attachmentApi.reducerPath]: attachmentApi.reducer,
    workspace: workspaceSlice,
    user: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attachmentApi.middleware).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
