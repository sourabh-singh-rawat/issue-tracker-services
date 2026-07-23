import { builder } from "@pine/graphql-core";

export const FileOutput = builder
  .objectRef<{
    id: string;
    bucket: string;
    thumbnailLink: string;
  }>("FileOutput")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      bucket: t.exposeString("bucket"),
      thumbnailLink: t.exposeString("thumbnailLink"),
    }),
  });
