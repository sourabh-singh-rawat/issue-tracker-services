import { builder } from "@issue-tracker/graphql-core";

export const Status = builder
  .objectRef<{
    id: string;
    name: string;
  }>("Status")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      name: t.exposeString("name"),
    }),
  });
