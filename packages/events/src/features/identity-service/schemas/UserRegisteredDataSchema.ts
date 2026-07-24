import Type from "typebox";

export const UserRegisteredDataSchema = Type.Object(
  {
    html: Type.String(),
    email: Type.String({ format: "email" }),
    userId: Type.String(),
  },
  { additionalProperties: false },
);

export type UserRegisteredData = Type.Static<typeof UserRegisteredDataSchema>;
