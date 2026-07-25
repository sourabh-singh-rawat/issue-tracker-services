import { builder } from "@pine/graphql-core";
import { ProjectObject } from "./ProjectObject";

export const PaginatedProjectObject = builder
  .objectRef<{
    rows: {
      id: string;
      name: string;
      workspaceId: string;
      workspace: {
        id: string;
        name: string;
        description?: string | null;
        createdById: string;
        status: string;
      };
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
