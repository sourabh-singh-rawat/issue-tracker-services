import apiSlice from '../../config/api.config';

const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createIssue: build.mutation({
      query: ({ body }) => ({
        url: '/issues',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['IssueStats', 'IssueList'],
    }),
    getIssue: build.query({
      query: (id) => `/issues/${id}`,
    }),
    getIssuesStatus: build.query({
      query: () => '/issues/status',
    }),
    getIssuesPriority: build.query({
      query: () => '/issues/priority',
    }),
    updateIssue: build.mutation({
      query: ({ id, body }) => ({
        url: `issues/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['IssueList', 'IssueStats'],
    }),
  }),
});

export const {
  useCreateIssueMutation,
  useCreateIssueAssigneeMutation,
  useGetIssueQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useUpdateIssueMutation,
} = issueApiSlice;
