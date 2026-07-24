import Type from "typebox";
import { MeIdentitySchema } from "@/features/me/schemas/MeIdentitySchema";

export const MeResponseSchema = Type.Object(
  {
    identity: MeIdentitySchema,
  },
  { additionalProperties: false },
);

export type MeResponse = Type.Static<typeof MeResponseSchema>;
