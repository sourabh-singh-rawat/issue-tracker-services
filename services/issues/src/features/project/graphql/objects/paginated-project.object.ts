import { builder } from "@pine/graphql-core";
import { Project } from "./project.object";

export const PaginatedProject = builder
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
  }>("PaginatedProject")
  .implement({
    fields: (t) => ({
      rows: t.field({
        type: [Project],
        resolve: (parent) => parent.rows,
      }),
      rowCount: t.exposeFloat("rowCount"),
    }),
  });
