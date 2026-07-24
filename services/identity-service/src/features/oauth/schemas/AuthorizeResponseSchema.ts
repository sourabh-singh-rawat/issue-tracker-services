import Type from "typebox";

export const AuthorizeResponseSchema = Type.Object(
  { redirectTo: Type.String({ minLength: 1 }) },
  { additionalProperties: false },
);

export type AuthorizeResponse = Type.Static<typeof AuthorizeResponseSchema>;
