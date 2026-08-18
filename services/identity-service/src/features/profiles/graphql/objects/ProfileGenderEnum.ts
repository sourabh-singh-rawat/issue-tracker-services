import { builder } from "@pine/server";
import { ProfileGender } from "@/features/profiles/constants";

export const ProfileGenderEnum = builder.enumType("ProfileGender", {
  values: Object.values(ProfileGender),
});
