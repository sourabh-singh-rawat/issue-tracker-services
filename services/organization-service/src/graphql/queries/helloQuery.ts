import { builder } from "@pine/graphql-core";

builder.queryFields((t) => ({
  organizationServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
