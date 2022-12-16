import { apiSlice } from "../../../config/api.config.js";

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
      invalidatesTags: ["IssueStats", "IssueList"],
    }),
    createIssueAttachment: build.mutation({
      query: ({ issueId, body }) => {
        return {
          url: `/issues/${issueId}/attachments`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["IssueAttachments"],
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
    getIssueAttachments: build.query({
      query: ({ issueId }) => {
        return `issues/${issueId}/attachments`;
      },
      providesTags: ["IssueAttachments"],
    }),
    updateIssue: build.mutation({
      query: ({ id, body }) => {
        return {
          url: `issues/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["IssueList", "IssueStats"],
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
