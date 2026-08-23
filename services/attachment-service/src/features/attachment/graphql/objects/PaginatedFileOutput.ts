import { builder } from "@pine/server";
import type { Attachment } from "@/db";
import { FileOutput } from "./FileOutput";

export const PaginatedFileOutput = builder
  .objectRef<{
    rows: Attachment[];
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
