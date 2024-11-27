import { apiSlice as api } from "../../attachment.config";
export const addTagTypes = ["attachment"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createAttachment: build.mutation<
        CreateAttachmentApiResponse,
        CreateAttachmentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/attachments/${queryArg.itemId}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["attachment"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as attachmentApi };
export type CreateAttachmentApiResponse =
  /** status 201 Created successfully */ string;
export type CreateAttachmentApiArg = {
  itemId: string;
  body: Blob;
};
export const { useCreateAttachmentMutation } = injectedRtkApi;
