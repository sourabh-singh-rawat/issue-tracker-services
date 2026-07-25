import Type from "typebox";
import { LoginIdentitySchema } from "@/features/login/schemas/LoginIdentitySchema";

export const LoginResponseSchema = Type.Object(
  {
    identity: LoginIdentitySchema,
    redirectTo: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type LoginResponse = Type.Static<typeof LoginResponseSchema>;
