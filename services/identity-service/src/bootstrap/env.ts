import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  IDENTITY_SERVICE_PORT: Type.String({ default: "4001" }),
  IDENTITY_POSTGRES_CLUSTER_URL: Type.String({ minLength: 1 }),
  NATS_CLUSTER_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  IDENTITY_WEB_CLIENT_URL: Type.String({ default: "http://localhost:3001" }),
  KRATOS_PUBLIC_URL: Type.String({ default: "http://127.0.0.1:4433" }),
  KRATOS_ADMIN_URL: Type.String({ default: "http://127.0.0.1:4434" }),
  HYDRA_PUBLIC_URL: Type.String({ default: "http://127.0.0.1:4444" }),
  HYDRA_ADMIN_URL: Type.String({ default: "http://127.0.0.1:4445" }),
  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String({ default: "http://127.0.0.1:4317" }),
});

export type Env = Type.Static<typeof EnvSchema>;

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults);
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
