import { builder } from "@pine/server";

export const CreateIdentityInput = builder.inputType("CreateIdentityInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    username: t.string({ required: true }),
    password: t.string({ required: true }),
    emailVerified: t.boolean({ required: true }),
    firstName: t.string({ required: true }),
    middleName: t.string({ required: false }),
    lastName: t.string({ required: false }),
  }),
});
