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
        assignee_id = "",
      }) => {
        return `/issues?projectId=${projectId}&page=${page}&limit=${pageSize}&sort_by=${sortBy}&reporter_id=${reporterId}&assignee_id=${assignee_id}`;
      },
      providesTags: ["IssueList"],
    }),
  }),
});

export const { useGetIssuesQuery } = issueListApiSlice;
