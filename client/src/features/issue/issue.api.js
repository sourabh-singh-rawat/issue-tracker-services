import { apiSlice } from "../../app/services/api.service";

const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createIssue: build.mutation({
      query: ({ payload }) => {
        return {
          url: `/issues`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Issue"],
    }),
    createIssueComment: build.mutation({
      query: (payload) => {
        return {
          url: `/issues/comments`,
          method: "POST",
          body: payload,
        };
      },
    }),
    createIssueTask: build.mutation({
      query: (payload) => {
        return {
          url: `/issues/tasks`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getIssueTasks: build.query({
      query: (id) => {
        return `/issues/${id}/tasks`;
      },
    }),
    getIssueComments: build.query({
      query: (id) => {
        return `issues/${id}/comments`;
      },
    }),
    getIssue: build.query({
      query: (id) => {
        return `/issues/${id}`;
      },
    }),
    getIssuesStatus: build.query({
      query: () => {
        return `/issues/status`;
      },
    }),
    getIssuesPriority: build.query({
      query: () => {
        return `/issues/priority`;
      },
    }),
    updateIssue: build.mutation({
      query: ({ id, payload }) => {
        return {
          url: `issues/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useCreateIssueMutation,
  useCreateIssueTaskMutation,
  useCreateIssueCommentMutation,
  useGetIssueQuery,
  useGetIssueTasksQuery,
  useGetIssueCommentsQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useUpdateIssueMutation,
} = issueApiSlice;
