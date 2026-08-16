import { builder } from "@pine/server";
import { ProfileGenderEnum } from "@/features/profiles/graphql/objects/ProfileGenderEnum";

export const UpdateProfileGenderInput = builder.inputType("UpdateProfileGenderInput", {
  fields: (t) => ({
    gender: t.field({ type: ProfileGenderEnum, required: true }),
  }),
});
