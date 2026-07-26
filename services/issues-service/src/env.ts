import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  ISSUES_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5001" }),
  /** Full URL override (multi-db / remote). Prefer POSTGRES_ISSUES_PASSWORD for single-db local. */
  ISSUES_DATABASE_URL: Type.Optional(Type.String({ minLength: 1 })),
  POSTGRES_ISSUES_PASSWORD: Type.Optional(Type.String({ minLength: 1 })),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  ISSUES_WEB_URL: Type.String({ default: "http://localhost:3001" }),
});

type RawEnv = Type.Static<typeof EnvSchema>;

export type Env = Omit<RawEnv, "ISSUES_DATABASE_URL" | "POSTGRES_ISSUES_PASSWORD"> & {
  ISSUES_DATABASE_URL: string;
};

export const listenPortFromUrl = (url: string): number => {
  const parsed = new URL(url);
  if (parsed.port) return Number.parseInt(parsed.port, 10);
  return parsed.protocol === "https:" ? 443 : 80;
};

const resolveDatabaseUrl = (raw: RawEnv): string => {
  const explicit = raw.ISSUES_DATABASE_URL?.trim();
  if (explicit) return explicit;
  const password = raw.POSTGRES_ISSUES_PASSWORD?.trim();
  if (!password) {
    throw new Error(
      "Set ISSUES_DATABASE_URL or POSTGRES_ISSUES_PASSWORD (single-db local default port 5432)",
    );
  }
  return `postgres://issues:${password}@localhost:5432/issues`;
};

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as RawEnv;
  const parsed = Value.Parse(EnvSchema, cleaned) as RawEnv;
  return {
    ...parsed,
    ISSUES_DATABASE_URL: resolveDatabaseUrl(parsed),
  };
};

export const env = parseEnv();
