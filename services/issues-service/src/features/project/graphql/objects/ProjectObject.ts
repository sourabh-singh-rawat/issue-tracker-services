import { builder } from "@pine/graphql-core";

export const ProjectObject = builder
  .objectRef<{
    id: string;
    name: string;
  }>("ProjectObject")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      name: t.exposeString("name"),
    }),
  });
