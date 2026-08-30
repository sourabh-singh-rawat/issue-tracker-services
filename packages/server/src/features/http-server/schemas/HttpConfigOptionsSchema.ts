import { ENVIRONMENT } from "@pine/common";
import Type from "typebox";

export const HttpConfigOptionsSchema = Type.Object(
  {
    port: Type.Integer(),
    host: Type.String(),
    environment: Type.Union([
      Type.Literal(ENVIRONMENT.PRODUCTION),
      Type.Literal(ENVIRONMENT.DEVELOPMENT),
      Type.Literal(ENVIRONMENT.TEST),
    ]),
    version: Type.Integer(),
  },
  { additionalProperties: false },
);

export type HttpConfigOptions = Type.Static<typeof HttpConfigOptionsSchema>;
