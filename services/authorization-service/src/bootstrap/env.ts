import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal("development"), Type.Literal("production")], {
    default: "development",
  }),
  AUTHORIZATION_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5006" }),
  AUTHORIZATION_DATABASE_URL: Type.String({ minLength: 1 }),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  ERP_WEB_URL: Type.String({ default: "http://localhost:3001" }),
  KETO_READ_URL: Type.String({ default: "http://127.0.0.1:4466" }),
  KETO_WRITE_URL: Type.String({ default: "http://127.0.0.1:4467" }),

  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String({ default: "http://127.0.0.1:4317" }),
});

export type Env = Type.Static<typeof EnvSchema>;

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as Env;
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
