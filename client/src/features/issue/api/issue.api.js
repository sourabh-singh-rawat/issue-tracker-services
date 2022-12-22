/* eslint-disable import/extensions */
import apiSlice from '../../../config/api.config.js';

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
    createIssueAttachment: build.mutation({
      query: ({ issueId, body }) => ({
        url: `/issues/${issueId}/attachments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['IssueAttachments'],
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
    getIssueAttachments: build.query({
      query: ({ issueId }) => `issues/${issueId}/attachments`,
      providesTags: ['IssueAttachments'],
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
  useCreateIssueAttachmentMutation,
  useGetIssueQuery,
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useGetIssueAttachmentsQuery,
  useUpdateIssueMutation,
} = issueApiSlice;
