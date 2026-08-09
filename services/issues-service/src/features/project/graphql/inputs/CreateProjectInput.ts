import { builder } from "@pine/server";

export const CreateProjectInput = builder.inputType("CreateProjectInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});
