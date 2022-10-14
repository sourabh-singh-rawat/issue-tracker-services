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
      query: ({ id, body }) => {
        return {
          url: `issues/${id}`,
          method: "PATCH",
          body,
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
      query: (body) => {
        return {
          url: `/issues/comments`,
          method: "POST",
          body,
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
    getIssueTasks: build.query({
      query: (id) => {
        return `/issues/${id}/tasks`;
      },
      providesTags: ["Task"],
    }),
    createIssueTask: build.mutation({
      query: (body) => {
        return {
          url: "/issues/tasks",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateIssueMutation,
  useGetIssueQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useUpdateIssueMutation,

  useCreateIssueCommentMutation,
  useGetIssueCommentsQuery,
  useDeleteCommentMutation,

  useGetIssueTasksQuery,
  useCreateIssueTaskMutation,
} = issueApiSlice;
