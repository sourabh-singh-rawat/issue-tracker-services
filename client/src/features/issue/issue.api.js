import { apiSlice } from "../../configs/api.config.js";

const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createIssue: build.mutation({
      query: ({ body }) => {
        return {
          url: `/issues`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["IssueList"],
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
  }),
});

export const {
  useCreateIssueMutation,
  useGetIssueQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useUpdateIssueMutation,
} = issueApiSlice;
