import { builder } from "@pine/graphql-core";
import { WorkspaceObject } from "@/features/workspace/graphql/objects/WorkspaceObject";

export const ProjectObject = builder
  .objectRef<{
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
  }>("ProjectObject")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      name: t.exposeString("name"),
      workspaceId: t.exposeString("workspaceId"),
      workspace: t.field({
        type: WorkspaceObject,
        resolve: (parent) => parent.workspace,
      }),
    }),
  });
