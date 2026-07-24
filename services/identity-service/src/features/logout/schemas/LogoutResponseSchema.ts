import Type from "typebox";

export const LogoutResponseSchema = Type.Object(
  {
    message: Type.String(),
  },
  { additionalProperties: false },
);

export type LogoutResponse = Type.Static<typeof LogoutResponseSchema>;
