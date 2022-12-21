import { apiSlice } from "../../../config/api.config.js";

const issueListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query({
      query: ({
        projectId = "",
        page = 0,
        pageSize = 10,
        sortBy = "issues.created_at:desc",
        reporterId,
        assigneeId = "",
      }) => {
        return `/issues?projectId=${projectId}&page=${page}&limit=${pageSize}&sortBy=${sortBy}&reporterId=${reporterId}&assigneeId=${assigneeId}`;
      },
      providesTags: ["IssueList"],
    }),
  }),
});

export const { useGetIssuesQuery } = issueListApiSlice;
