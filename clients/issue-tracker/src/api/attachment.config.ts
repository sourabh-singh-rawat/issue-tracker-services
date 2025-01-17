import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_ATTACHMENT_SERVER_URL;

export const apiSlice = createApi({
  reducerPath: "attachment-api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    credentials: "include",
    referrerPolicy: "origin-when-cross-origin",
  }),
  endpoints: () => ({}),
});

export default apiSlice;
