import Type from "typebox";

export const AuthorizeBodySchema = Type.Object(
  {
    clientId: Type.String({ minLength: 1 }),
    redirectUri: Type.String({ minLength: 1 }),
    responseType: Type.Literal("code"),
    scope: Type.String({ minLength: 1 }),
    state: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type AuthorizeBody = Type.Static<typeof AuthorizeBodySchema>;
