import { builder } from "@issue-tracker/graphql-core";
import { Workspace } from "@/features/workspace/graphql/objects/workspace.object";

export const Project = builder
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
  }>("Project")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      name: t.exposeString("name"),
      workspaceId: t.exposeString("workspaceId"),
      workspace: t.field({
        type: Workspace,
        resolve: (parent) => parent.workspace,
      }),
    }),
  });
