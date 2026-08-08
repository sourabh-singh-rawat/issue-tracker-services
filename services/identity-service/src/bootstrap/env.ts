import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal("development"), Type.Literal("production")], {
    default: "development",
  }),
  IDENTITY_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5000" }),
  IDENTITY_DATABASE_URL: Type.String({ minLength: 1 }),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  IDENTITY_WEB_URL: Type.String({ default: "http://localhost:3000" }),
  ERP_WEB_URL: Type.String({ default: "http://localhost:3001" }),
  ADMIN_WEB_URL: Type.String({ default: "http://localhost:3002" }),
  KRATOS_PUBLIC_URL: Type.String({ default: "http://127.0.0.1:4433" }),
  KRATOS_ADMIN_URL: Type.String({ default: "http://127.0.0.1:4434" }),
  HYDRA_PUBLIC_URL: Type.String({ default: "http://127.0.0.1:4444" }),
  HYDRA_ADMIN_URL: Type.String({ default: "http://127.0.0.1:4445" }),
  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String({ default: "http://127.0.0.1:4317" }),
});

export type Env = Type.Static<typeof EnvSchema>;

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as Env;
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
