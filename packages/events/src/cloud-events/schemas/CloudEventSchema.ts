import Type from "typebox";

export const CloudEventSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    source: Type.String({ minLength: 1 }),
    specversion: Type.Literal("1.0"),
    type: Type.String({ minLength: 1 }),
    dataschema: Type.String({ minLength: 1 }),
    time: Type.Optional(Type.String()),
    datacontenttype: Type.Optional(Type.String()),
    subject: Type.Optional(Type.String()),
    data: Type.Optional(Type.Unknown()),
  },
  { additionalProperties: true },
);

export type CloudEventBase = Type.Static<typeof CloudEventSchema>;
