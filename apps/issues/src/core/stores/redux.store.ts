import { configureStore } from "@reduxjs/toolkit";

import { attachmentApi } from "../../api/codegen/rest/attachment.api";

export const store = configureStore({
  reducer: {
    [attachmentApi.reducerPath]: attachmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(attachmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
