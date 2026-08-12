import { builder } from "@pine/server";

builder.queryFields((t) => ({
  platformServiceHealth: t.string({
    resolve: () => "ok",
  }),
}));
