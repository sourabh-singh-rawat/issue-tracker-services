/* eslint-disable implicit-arrow-linebreak */

import apiSlice from '../../config/api.config';

const issueListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query({
      query: ({
        projectId = '',
        page = 0,
        pageSize = 10,
        sortBy = 'issues.created_at:desc',
        reporterId,
        assigneeId = '',
      }) =>
        `/issues?projectId=${projectId}&page=${page}&limit=${pageSize}&sortBy=${sortBy}&reporterId=${reporterId}&assigneeId=${assigneeId}`,
      providesTags: ['IssueList'],
    }),
    getIssueStats: build.query({
      query: ({ projectId }) => `/issues/stats?projectId=${projectId}`,
      providesTags: ['IssueStats'],
    }),
  }),
});

export const { useGetIssuesQuery, useGetIssueStatsQuery } = issueListApiSlice;
