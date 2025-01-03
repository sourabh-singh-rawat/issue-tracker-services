import { configureStore } from "@reduxjs/toolkit";

import { attachmentApi } from "../../api/codegen/rest/attachment.api";
import auth from "../../features/auth/auth.slice";
import space from "../../features/space/space.slice";
import workspace from "../../features/workspace/workspace.slice";

export const store = configureStore({
  reducer: {
    [attachmentApi.reducerPath]: attachmentApi.reducer,
    workspace,
    auth,
    space,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attachmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
