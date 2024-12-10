export const ENVIRONMENT = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
} as const;

export type Environment = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];
