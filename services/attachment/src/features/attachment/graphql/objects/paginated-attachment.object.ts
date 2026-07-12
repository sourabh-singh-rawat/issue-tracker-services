import { builder } from "@issue-tracker/graphql-core";
import { Attachment } from "./attachment.object";

export const PaginatedAttachment = builder
  .objectRef<{
    rows: {
      id: string;
      bucket: string;
      thumbnailLink: string;
    }[];
    rowCount: number;
  }>("PaginatedAttachment")
  .implement({
    fields: (t) => ({
      rows: t.field({
        type: [Attachment],
        resolve: (parent) => parent.rows,
      }),
      rowCount: t.exposeFloat("rowCount"),
    }),
  });
