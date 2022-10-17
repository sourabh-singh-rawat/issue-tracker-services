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
