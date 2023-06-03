import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = {
  NODE_API: 'http://localhost:4000/api',
};

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl.NODE_API,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const store = getState();
    const { accessToken } = store.auth;

    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    'Project',
    'Issue',
    'IssueList',
    'IssueStats',
    'IssueAttachments',
    'Comment',
    'Task',
  ],
});

export default apiSlice;
