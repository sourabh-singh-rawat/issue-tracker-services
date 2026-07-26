import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  /** Full URL override (multi-db / remote). Prefer POSTGRES_MAIL_PASSWORD for single-db local. */
  MAIL_DATABASE_URL: Type.Optional(Type.String({ minLength: 1 })),
  POSTGRES_MAIL_PASSWORD: Type.Optional(Type.String({ minLength: 1 })),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  BREVO_EMAIL: Type.Optional(Type.String()),
  BREVO_SECRET: Type.Optional(Type.String()),
});

type RawEnv = Type.Static<typeof EnvSchema>;

export type Env = Omit<RawEnv, "MAIL_DATABASE_URL" | "POSTGRES_MAIL_PASSWORD"> & {
  MAIL_DATABASE_URL: string;
};

const resolveDatabaseUrl = (raw: RawEnv): string => {
  const explicit = raw.MAIL_DATABASE_URL?.trim();
  if (explicit) return explicit;
  const password = raw.POSTGRES_MAIL_PASSWORD?.trim();
  if (!password) {
    throw new Error(
      "Set MAIL_DATABASE_URL or POSTGRES_MAIL_PASSWORD (single-db local default port 5432)",
    );
  }
  return `postgres://mail:${password}@localhost:5432/mail`;
};

const parseEnv = (): Env => {
  const withDefaults = Value.Default(EnvSchema, { ...process.env });
  const cleaned = Value.Clean(EnvSchema, withDefaults) as RawEnv;
  const parsed = Value.Parse(EnvSchema, cleaned) as RawEnv;
  return {
    ...parsed,
    MAIL_DATABASE_URL: resolveDatabaseUrl(parsed),
  };
};

export const env = parseEnv();
