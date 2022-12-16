import { apiSlice } from "../../../config/api.config.js";

const issueCommentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const {
  useCreateIssueCommentMutation,
  useGetIssueCommentsQuery,
  useDeleteCommentMutation,
} = issueCommentsApiSlice;
