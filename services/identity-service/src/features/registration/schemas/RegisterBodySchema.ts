import Type from "typebox";

export const RegisterBodySchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type RegisterBody = Type.Static<typeof RegisterBodySchema>;
