import Type from "typebox";
import { LoginIdentitySchema } from "@/features/login/schemas/LoginIdentitySchema";

export const LoginResponseSchema = Type.Object(
  {
    identity: LoginIdentitySchema,
  },
  { additionalProperties: false },
);

export type LoginResponse = Type.Static<typeof LoginResponseSchema>;
