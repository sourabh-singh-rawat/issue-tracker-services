import apiSlice from "../../store/api.config";

const issueCommentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIssueComments: build.query({
      query: (id) => `issues/${id}/comments`,
      providesTags: ["Comment"],
    }),
    createIssueComment: build.mutation({
      query: (body) => ({
        url: "/issues/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: build.mutation({
      query: ({ id, commentId }) => ({
        url: `issues/${id}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateIssueCommentMutation,
  useGetIssueCommentsQuery,
  useDeleteCommentMutation,
} = issueCommentsApiSlice;
