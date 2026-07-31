import { builder } from "@pine/graphql-core";
import { ProjectObject } from "./ProjectObject";

export const PaginatedProjectObject = builder
  .objectRef<{
    rows: {
      id: string;
      name: string;
    }[];
    rowCount: number;
  }>("PaginatedProjectObject")
  .implement({
    fields: (t) => ({
      rows: t.field({
        type: [ProjectObject],
        resolve: (parent) => parent.rows,
      }),
      rowCount: t.exposeFloat("rowCount"),
    }),
  });
