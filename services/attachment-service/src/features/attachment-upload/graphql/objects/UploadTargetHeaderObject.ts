import { builder } from "@pine/server";

export const UploadTargetHeaderObject = builder
  .objectRef<{
    key: string;
    value: string;
  }>("UploadTargetHeader")
  .implement({
    fields: (t) => ({
      key: t.exposeString("key"),
      value: t.exposeString("value"),
    }),
  });
