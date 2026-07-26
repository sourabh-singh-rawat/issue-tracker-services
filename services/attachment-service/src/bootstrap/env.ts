import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  ATTACHMENT_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5003" }),
  /** Full URL override (multi-db / remote). Prefer POSTGRES_ATTACHMENT_PASSWORD for single-db local. */
  ATTACHMENT_DATABASE_URL: Type.Optional(Type.String({ minLength: 1 })),
  POSTGRES_ATTACHMENT_PASSWORD: Type.Optional(Type.String({ minLength: 1 })),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  ISSUES_WEB_URL: Type.String({ default: "http://localhost:3001" }),
  REDIS_URL: Type.String({ default: "redis://localhost:6380" }),
});

type RawEnv = Type.Static<typeof EnvSchema>;

export type Env = Omit<RawEnv, "ATTACHMENT_DATABASE_URL" | "POSTGRES_ATTACHMENT_PASSWORD"> & {
  ATTACHMENT_DATABASE_URL: string;
};

export const listenPortFromUrl = (url: string): number => {
  const parsed = new URL(url);
  if (parsed.port) return Number.parseInt(parsed.port, 10);
  return parsed.protocol === "https:" ? 443 : 80;
};

const resolveDatabaseUrl = (raw: RawEnv): string => {
  const explicit = raw.ATTACHMENT_DATABASE_URL?.trim();
  if (explicit) return explicit;
  const password = raw.POSTGRES_ATTACHMENT_PASSWORD?.trim();
  if (!password) {
    throw new Error(
      "Set ATTACHMENT_DATABASE_URL or POSTGRES_ATTACHMENT_PASSWORD (single-db local default port 5432)",
    );
  }
  return `postgres://attachment:${password}@localhost:5432/attachment`;
};

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as RawEnv;
  const parsed = Value.Parse(EnvSchema, cleaned) as RawEnv;
  return {
    ...parsed,
    ATTACHMENT_DATABASE_URL: resolveDatabaseUrl(parsed),
  };
};

export const env = parseEnv();
