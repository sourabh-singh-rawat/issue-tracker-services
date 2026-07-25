import Type from "typebox";

export const UserEmailVerifiedDataSchema = Type.Object(
  {
    emailVerificationStatus: Type.Union([
      Type.Literal("Unverified"),
      Type.Literal("Verified"),
      Type.Literal("Failed"),
    ]),
    userId: Type.String(),
    email: Type.String({ format: "email" }),
    displayName: Type.String(),
    photoUrl: Type.Optional(Type.String()),
    inviteToken: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type UserEmailVerifiedData = Type.Static<typeof UserEmailVerifiedDataSchema>;
