import apiSlice from '../../../config/api.config';

const issueAttachmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createIssueAttachment: build.mutation({
      query: ({ issueId, body }) => ({
        url: `/issues/${issueId}/attachments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['IssueAttachments'],
    }),
    getIssueAttachments: build.query({
      query: ({ issueId }) => `issues/${issueId}/attachments`,
      providesTags: ['IssueAttachments'],
    }),
    getIssueAttachment: build.query({
      query: ({ issueId, attachmentId }) =>
        `issues/${issueId}/attachments/${attachmentId}`,
    }),
  }),
});

export const {
  useCreateIssueAttachmentMutation,
  useGetIssueAttachmentQuery,
  useGetIssueAttachmentsQuery,
} = issueAttachmentApiSlice;
