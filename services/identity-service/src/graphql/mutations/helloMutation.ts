import { builder } from "@pine/server";

builder.mutationFields((t) => ({
  hello: t.string({
    resolve: () => "Hello world",
  }),
}));
