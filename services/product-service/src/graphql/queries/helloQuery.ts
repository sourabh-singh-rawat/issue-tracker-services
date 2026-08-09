import { builder } from "@pine/server";

builder.queryFields((t) => ({
  productServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
