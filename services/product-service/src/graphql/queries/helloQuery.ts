import { builder } from "@pine/graphql-core";

builder.queryFields((t) => ({
  productServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
