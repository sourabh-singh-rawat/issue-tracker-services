import { builder } from "@pine/server";
import type { Profile } from "@/db";
import { isProfileGender } from "@/features/profiles/constants";
import { ProfileGenderEnum } from "@/features/profiles/graphql/objects/ProfileGenderEnum";

export const ProfileObject = builder.objectRef<Profile>("ProfileObject");

ProfileObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    identityId: t.exposeString("identityId"),
    firstName: t.exposeString("firstName"),
    middleName: t.exposeString("middleName", { nullable: true }),
    lastName: t.exposeString("lastName", { nullable: true }),
    gender: t.field({
      type: ProfileGenderEnum,
      nullable: true,
      resolve: (profile) =>
        profile.gender && isProfileGender(profile.gender) ? profile.gender : null,
    }),
    description: t.exposeString("description", { nullable: true }),
    photoUrl: t.exposeString("photoUrl", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
  }),
});
