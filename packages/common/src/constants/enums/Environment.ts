export const ENVIRONMENT = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  TEST: "test",
} as const;

export type Environment = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];
