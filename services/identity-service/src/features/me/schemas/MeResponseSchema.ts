import Type from "typebox";
import { MeIdentitySchema } from "@/features/me/schemas/MeIdentitySchema";
import { MeProfileSchema } from "@/features/me/schemas/MeProfileSchema";

export const MeResponseSchema = Type.Object(
  {
    identity: MeIdentitySchema,
    profile: Type.Union([MeProfileSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

export type MeResponse = Type.Static<typeof MeResponseSchema>;
