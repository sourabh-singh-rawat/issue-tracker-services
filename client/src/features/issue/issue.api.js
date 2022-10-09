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
    getIssueComments: build.query({
      query: (id) => {
        return `issues/${id}/comments`;
      },
      providesTags: ["Comment"],
    }),
    createIssueComment: build.mutation({
      query: (payload) => {
        return {
          url: `/issues/comments`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Comment"],
    }),
    deleteComment: build.mutation({
      query: ({ id, commentId }) => {
        return {
          url: `issues/${id}/comments/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateIssueMutation,
  useCreateIssueTaskMutation,
  useGetIssueQuery,
  useGetIssueTasksQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useUpdateIssueMutation,
  useCreateIssueCommentMutation,
  useGetIssueCommentsQuery,
  useDeleteCommentMutation,
} = issueApiSlice;
