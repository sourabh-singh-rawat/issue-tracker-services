import { builder } from "@pine/server";
import type { CreatePhotoUploadRequestResult } from "@/features/profiles/services";

export const PhotoUploadHeaderObject = builder
  .objectRef<{ key: string; value: string }>("PhotoUploadHeaderObject")
  .implement({
    fields: (t) => ({
      key: t.exposeString("key"),
      value: t.exposeString("value"),
    }),
  });

export const PhotoUploadTargetObject = builder
  .objectRef<CreatePhotoUploadRequestResult>("PhotoUploadTargetObject")
  .implement({
    fields: (t) => ({
      uploadRequestId: t.exposeString("uploadRequestId"),
      url: t.exposeString("url"),
      expiresAt: t.exposeString("expiresAt"),
      headers: t.field({
        type: [PhotoUploadHeaderObject],
        resolve: (target) =>
          Object.entries(target.headers).map(([key, value]) => ({
            key,
            value,
          })),
      }),
    }),
  });
