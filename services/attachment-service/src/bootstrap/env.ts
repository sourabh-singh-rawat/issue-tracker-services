import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  ATTACHMENT_SERVICE_PORT: Type.String({ default: "4003" }),
  ATTACHMENT_POSTGRES_CLUSTER_URL: Type.String({ minLength: 1 }),
  NATS_CLUSTER_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  ISSUES_WEB_CLIENT_URL: Type.String({ default: "http://localhost:3000" }),
  ATTACHMENT_REDIS_HOST: Type.String({ default: "localhost" }),
  ATTACHMENT_REDIS_PORT: Type.String({ default: "6380" }),
});

export type Env = Type.Static<typeof EnvSchema>;

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults);
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
