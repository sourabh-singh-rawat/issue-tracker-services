import Type from "typebox";

export const MeProfileSchema = Type.Object(
  {
    id: Type.String(),
    identityId: Type.String(),
    firstName: Type.String(),
    middleName: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    lastName: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    gender: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    photoUrl: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    fullName: Type.String(),
  },
  { additionalProperties: false },
);

export type MeProfile = Type.Static<typeof MeProfileSchema>;
