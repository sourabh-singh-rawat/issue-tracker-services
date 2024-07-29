import { apiSlice as api } from "../storage.config";
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
          url: `/api/v1/issues/${queryArg.id}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["attachment"],
      }),
      getIssueAttachmentList: build.query<
        GetIssueAttachmentListApiResponse,
        GetIssueAttachmentListApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/issues/${queryArg.id}` }),
        providesTags: ["attachment"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as storageApi };
export type CreateIssueAttachmentApiResponse =
  /** status 201 Created a new issue attachment */ string;
export type CreateIssueAttachmentApiArg = {
  id: string;
  body: string;
};
export type GetIssueAttachmentListApiResponse =
  /** status 200 List of issue attachments */ {
    rows: any;
    filteredRowCount?: number;
  };
export type GetIssueAttachmentListApiArg = {
  id: string;
};
export const {
  useCreateIssueAttachmentMutation,
  useGetIssueAttachmentListQuery,
} = injectedRtkApi;
