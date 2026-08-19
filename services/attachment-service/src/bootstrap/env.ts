import { ENVIRONMENT } from "@pine/common";
import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.Union(
    [
      Type.Literal(ENVIRONMENT.DEVELOPMENT),
      Type.Literal(ENVIRONMENT.PRODUCTION),
      Type.Literal(ENVIRONMENT.TEST),
    ],
    { default: ENVIRONMENT.DEVELOPMENT },
  ),
  ATTACHMENT_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5003" }),
  IDENTITY_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5000" }),
  ATTACHMENT_DATABASE_URL: Type.String({ minLength: 1 }),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  ERP_WEB_URL: Type.String({ default: "http://localhost:3001" }),
  IDENTITY_WEB_URL: Type.String({ default: "http://localhost:3000" }),
  REDIS_URL: Type.String({ default: "redis://localhost:6380" }),
  S3_ENDPOINT: Type.String({ default: "http://127.0.0.1:8333" }),
  S3_REGION: Type.String({ default: "us-east-1" }),
  S3_BUCKET: Type.String({ default: "attachments" }),
  S3_ACCESS_KEY: Type.String({ default: "seaweed" }),
  S3_SECRET_KEY: Type.String({ default: "seaweed" }),
});

export type Env = Type.Static<typeof EnvSchema>;

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults);
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
