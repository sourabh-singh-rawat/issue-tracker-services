import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  MAIL_POSTGRES_CLUSTER_URL: Type.String({ minLength: 1 }),
  NATS_CLUSTER_URL: Type.String({ default: "nats://localhost:4222" }),
  BREVO_EMAIL: Type.Optional(Type.String()),
  BREVO_SECRET: Type.Optional(Type.String()),
});

export type Env = Type.Static<typeof EnvSchema>;

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults);
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
