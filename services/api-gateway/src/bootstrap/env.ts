import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  API_GATEWAY_URL: Type.String({ default: "http://127.0.0.1:4000" }),
  IDENTITY_WEB_URL: Type.String({ default: "http://localhost:3000" }),
  ERP_WEB_URL: Type.String({ default: "http://localhost:3001" }),
  ADMIN_WEB_URL: Type.String({ default: "http://localhost:3002" }),
  IDENTITY_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5000" }),
  ATTACHMENT_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5003" }),
  INVENTORY_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5002" }),
  PRODUCT_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5004" }),
  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String({ default: "http://127.0.0.1:4317" }),
});

export type Env = Type.Static<typeof EnvSchema>;

/** Port a service should bind when listening; derived from its public URL. */
export const listenPortFromUrl = (url: string): number => {
  const parsed = new URL(url);
  if (parsed.port) return Number.parseInt(parsed.port, 10);
  return parsed.protocol === "https:" ? 443 : 80;
};

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as Env;
  return Value.Parse(EnvSchema, cleaned);
};

export const env = parseEnv();
