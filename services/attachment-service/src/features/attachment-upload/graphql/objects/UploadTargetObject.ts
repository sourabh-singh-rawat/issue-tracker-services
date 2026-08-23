import { builder } from "@pine/server";
import type { UploadTarget } from "@/integrations/storage";
import { UploadTargetHeaderObject } from "@/features/attachment-upload/graphql/objects/UploadTargetHeaderObject";

export const UploadTargetObject = builder.objectRef<UploadTarget>("UploadTarget").implement({
  fields: (t) => ({
    objectId: t.exposeString("objectId"),
    url: t.exposeString("url"),
    headers: t.field({
      type: [UploadTargetHeaderObject],
      resolve: (parent) =>
        Object.entries(parent.headers).map(([key, value]) => ({
          key,
          value,
        })),
    }),
    expiresAt: t.field({
      type: "DateTimeISO",
      resolve: (parent) => parent.expiresAt,
    }),
  }),
});
