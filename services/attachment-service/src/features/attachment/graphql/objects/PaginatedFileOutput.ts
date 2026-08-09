import { builder } from "@pine/server";
import { FileOutput } from "./FileOutput";

export const PaginatedFileOutput = builder
  .objectRef<{
    rows: {
      id: string;
      bucket: string;
      thumbnailLink: string;
    }[];
    rowCount: number;
  }>("PaginatedFileOutput")
  .implement({
    fields: (t) => ({
      rows: t.field({
        type: [FileOutput],
        resolve: (parent) => parent.rows,
      }),
      rowCount: t.exposeFloat("rowCount"),
    }),
  });
