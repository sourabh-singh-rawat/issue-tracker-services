import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const store = getState();
    const accessToken = store.auth.accessToken;

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Project", "Issue", "IssueList", "Comment", "Task"],
});
