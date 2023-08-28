/* eslint-disable implicit-arrow-linebreak */

import apiSlice from "../../store/api.config";

const issueListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query({
      query: ({
        projectId = "",
        page = 0,
        pageSize = 10,
        sortBy = "issues.createdAt:desc",
        reporterId,
        assigneeId = "",
      }) =>
        `/issues?projectId=${projectId}&page=${page}&limit=${pageSize}&sortBy=${sortBy}&reporterId=${reporterId}&assigneeId=${assigneeId}`,
      providesTags: ["IssueList"],
    }),
    getIssueStats: build.query({
      query: ({ projectId }) => `/issues/stats?projectId=${projectId}`,
      providesTags: ["IssueStats"],
    }),
  }),
});

export const { useGetIssuesQuery, useGetIssueStatsQuery } = issueListApiSlice;
