import Type from "typebox";
import { IdentitySchema } from "@/features/session/schemas/IdentitySchema";

export const GetIdentityFromAccessTokenResponseSchema = Type.Object(
  {
    identity: IdentitySchema,
  },
  { additionalProperties: false },
);

export type GetIdentityFromAccessTokenResponse = Type.Static<
  typeof GetIdentityFromAccessTokenResponseSchema
>;
