import { builder } from "@pine/graphql-core";

builder.queryFields((t) => ({
  authorizationServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
