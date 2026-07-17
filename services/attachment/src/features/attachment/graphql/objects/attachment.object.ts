import { builder } from "@pine/graphql-core";

export const Attachment = builder
  .objectRef<{
    id: string;
    bucket: string;
    thumbnailLink: string;
  }>("Attachment")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      bucket: t.exposeString("bucket"),
      thumbnailLink: t.exposeString("thumbnailLink"),
    }),
  });
