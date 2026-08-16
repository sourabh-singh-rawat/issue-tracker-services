import Type from "typebox";
import { IdentitySchema } from "@/features/session/schemas/IdentitySchema";

export const GetIdentityFromSessionResponseSchema = Type.Object(
  {
    identity: IdentitySchema,
  },
  { additionalProperties: false },
);

export type GetIdentityFromSessionResponse = Type.Static<
  typeof GetIdentityFromSessionResponseSchema
>;
