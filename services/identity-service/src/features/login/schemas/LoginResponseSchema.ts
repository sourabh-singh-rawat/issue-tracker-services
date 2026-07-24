import Type from "typebox";
import { LoginIdentitySchema } from "@/features/login/schemas/LoginIdentitySchema";

export const LoginResponseSchema = Type.Object(
  {
    identity: LoginIdentitySchema,
    sessionToken: Type.Optional(Type.String()),
    refreshToken: Type.Optional(Type.String()),
    sessionId: Type.Optional(Type.String()),
    expiresAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

export type LoginResponse = Type.Static<typeof LoginResponseSchema>;
