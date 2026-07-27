import Type from "typebox";

export const UserConfirmationEmailSentDataSchema = Type.Object(
  {
    userId: Type.String(),
    email: Type.String({ format: "email" }),
    sentAt: Type.Number(),
  },
  { additionalProperties: false },
);

export type UserConfirmationEmailSentData = Type.Static<typeof UserConfirmationEmailSentDataSchema>;
