import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  API_GATEWAY_PORT: Type.String({ default: "4000" }),
  ISSUES_WEB_CLIENT_URL: Type.String({ default: "http://localhost:3000" }),
  IDENTITY_WEB_CLIENT_URL: Type.String({ default: "http://localhost:3001" }),
  INVENTORY_WEB_CLIENT_URL: Type.String({ default: "http://localhost:3002" }),
  IDENTITY_SERVICE_PORT: Type.String({ default: "4001" }),
  ATTACHMENT_SERVICE_PORT: Type.String({ default: "4003" }),
  INVENTORY_SERVICE_PORT: Type.String({ default: "4004" }),
  IDENTITY_SERVICE_URL: Type.Optional(Type.String({ minLength: 1 })),
  ATTACHMENT_SERVICE_URL: Type.Optional(Type.String({ minLength: 1 })),
  INVENTORY_SERVICE_URL: Type.Optional(Type.String({ minLength: 1 })),
  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String({ default: "http://127.0.0.1:4317" }),
});

type RawEnv = Type.Static<typeof EnvSchema>;

export type Env = Omit<
  RawEnv,
  "IDENTITY_SERVICE_URL" | "ATTACHMENT_SERVICE_URL" | "INVENTORY_SERVICE_URL"
> & {
  IDENTITY_SERVICE_URL: string;
  ATTACHMENT_SERVICE_URL: string;
  INVENTORY_SERVICE_URL: string;
};

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as RawEnv;
  const parsed = Value.Parse(EnvSchema, cleaned);

  return {
    ...parsed,
    IDENTITY_SERVICE_URL:
      parsed.IDENTITY_SERVICE_URL ?? `http://127.0.0.1:${parsed.IDENTITY_SERVICE_PORT}`,
    ATTACHMENT_SERVICE_URL:
      parsed.ATTACHMENT_SERVICE_URL ?? `http://127.0.0.1:${parsed.ATTACHMENT_SERVICE_PORT}`,
    INVENTORY_SERVICE_URL:
      parsed.INVENTORY_SERVICE_URL ?? `http://127.0.0.1:${parsed.INVENTORY_SERVICE_PORT}`,
  };
};

export const env = parseEnv();
