import Type from "typebox";

export const AuthorizeQuerySchema = Type.Object(
  {
    responseType: Type.Literal("code"),
    clientId: Type.String({ minLength: 1 }),
    redirectUri: Type.String({ minLength: 1 }),
    scope: Type.String({ minLength: 1 }),
    state: Type.String({ minLength: 1 }),
    codeChallenge: Type.Optional(Type.String({ minLength: 1 })),
    codeChallengeMethod: Type.Optional(
      Type.Union([Type.Literal("S256"), Type.Literal("plain")]),
    ),
    nonce: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type AuthorizeQuery = Type.Static<typeof AuthorizeQuerySchema>;
