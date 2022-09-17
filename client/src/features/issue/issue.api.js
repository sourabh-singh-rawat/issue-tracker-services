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
    getIssue: build.query({
      query: (uid) => {
        return `/issues/${uid}`;
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
  }),
});

export const {
  useCreateIssueMutation,
  useGetIssueQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
} = issueApiSlice;
