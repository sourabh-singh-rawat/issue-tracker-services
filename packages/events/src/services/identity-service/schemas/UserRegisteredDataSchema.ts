import Type from "typebox";

export const UserRegisteredDataSchema = Type.Object(
  {
    userId: Type.String(),
  },
  { additionalProperties: false },
);

export type UserRegisteredData = Type.Static<typeof UserRegisteredDataSchema>;
