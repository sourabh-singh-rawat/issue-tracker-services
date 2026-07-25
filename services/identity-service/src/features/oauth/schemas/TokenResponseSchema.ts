import Type from "typebox";

export const TokenResponseSchema = Type.Object(
  {
    accessToken: Type.String({ minLength: 1 }),
    tokenType: Type.String({ minLength: 1 }),
    expiresIn: Type.Optional(Type.Integer({ minimum: 0 })),
    refreshToken: Type.Optional(Type.String({ minLength: 1 })),
    idToken: Type.Optional(Type.String({ minLength: 1 })),
    scope: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type TokenResponse = Type.Static<typeof TokenResponseSchema>;
