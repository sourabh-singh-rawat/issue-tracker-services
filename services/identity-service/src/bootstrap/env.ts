import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  IDENTITY_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5000" }),
  /** Full URL override (multi-db / remote). Prefer POSTGRES_IDENTITY_PASSWORD for single-db local. */
  IDENTITY_DATABASE_URL: Type.Optional(Type.String({ minLength: 1 })),
  POSTGRES_IDENTITY_PASSWORD: Type.Optional(Type.String({ minLength: 1 })),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  IDENTITY_WEB_URL: Type.String({ default: "http://localhost:3000" }),
  KRATOS_PUBLIC_URL: Type.String({ default: "http://127.0.0.1:4433" }),
  KRATOS_ADMIN_URL: Type.String({ default: "http://127.0.0.1:4434" }),
  HYDRA_PUBLIC_URL: Type.String({ default: "http://127.0.0.1:4444" }),
  HYDRA_ADMIN_URL: Type.String({ default: "http://127.0.0.1:4445" }),
  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String({ default: "http://127.0.0.1:4317" }),
});

type RawEnv = Type.Static<typeof EnvSchema>;

export type Env = Omit<RawEnv, "IDENTITY_DATABASE_URL" | "POSTGRES_IDENTITY_PASSWORD"> & {
  IDENTITY_DATABASE_URL: string;
};

export const listenPortFromUrl = (url: string): number => {
  const parsed = new URL(url);
  if (parsed.port) return Number.parseInt(parsed.port, 10);
  return parsed.protocol === "https:" ? 443 : 80;
};

const resolveDatabaseUrl = (raw: RawEnv): string => {
  const explicit = raw.IDENTITY_DATABASE_URL?.trim();
  if (explicit) return explicit;
  const password = raw.POSTGRES_IDENTITY_PASSWORD?.trim();
  if (!password) {
    throw new Error(
      "Set IDENTITY_DATABASE_URL or POSTGRES_IDENTITY_PASSWORD (single-db local default port 5432)",
    );
  }
  return `postgres://identity:${password}@localhost:5432/identity`;
};

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as RawEnv;
  const parsed = Value.Parse(EnvSchema, cleaned) as RawEnv;
  return {
    ...parsed,
    IDENTITY_DATABASE_URL: resolveDatabaseUrl(parsed),
  };
};

export const env = parseEnv();
