import Type from "typebox";

export const RegisterBodySchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
    username: Type.String({
      minLength: 3,
      maxLength: 30,
      pattern: "^(?=.{3,30}$)(?!.*[._]{2})[a-z](?:[a-z0-9]|[._](?=[a-z0-9]))*[a-z0-9]$",
    }),
    password: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type RegisterBody = Type.Static<typeof RegisterBodySchema>;
