import { apiSlice as api } from "../api.config";
export const addTagTypes = ["attachment"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createIssueAttachment: build.mutation<
        CreateIssueAttachmentApiResponse,
        CreateIssueAttachmentApiArg
      >({
        query: (queryArg) => ({
          url: `/attachments/issues/${queryArg.id}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["attachment"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type CreateIssueAttachmentApiResponse =
  /** status 201 Created a new issue attachment */ undefined;
export type CreateIssueAttachmentApiArg = {
  /** The numeric Id of the issue */
  id?: string;
  body: string;
};
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export const { useCreateIssueAttachmentMutation } = injectedRtkApi;
