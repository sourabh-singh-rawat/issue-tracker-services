import { builder } from "@pine/graphql-core";

export const WorkspaceObject = builder
  .objectRef<{
    id: string;
    name: string;
    description?: string | null;
    createdById: string;
    status: string;
  }>("WorkspaceObject")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      name: t.exposeString("name"),
      description: t.exposeString("description", { nullable: true }),
      createdById: t.exposeString("createdById"),
      status: t.exposeString("status"),
    }),
  });
