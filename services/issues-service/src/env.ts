import Type from "typebox";
import Value from "typebox/value";

export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  ISSUES_SERVICE_URL: Type.String({ default: "http://127.0.0.1:5001" }),
  ISSUES_DATABASE_URL: Type.String({ minLength: 1 }),
  NATS_URL: Type.String({ default: "nats://localhost:4222" }),
  JWT_SECRET: Type.String({ minLength: 1 }),
  ERP_WEB_URL: Type.String({ default: "http://localhost:3001" }),
});

export type Env = Type.Static<typeof EnvSchema>;

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
