import Type from "typebox";
import { SessionIdentitySchema } from "@/features/session/schemas/SessionIdentitySchema";

export const SessionResponseSchema = Type.Object(
  {
    identity: SessionIdentitySchema,
  },
  { additionalProperties: false },
);

export type SessionResponse = Type.Static<typeof SessionResponseSchema>;
