import { builder } from "@pine/server";

export const UpdateProfileNameInput = builder.inputType("UpdateProfileNameInput", {
  fields: (t) => ({
    firstName: t.string({ required: true }),
    middleName: t.string({ required: false }),
    lastName: t.string({ required: false }),
  }),
});
