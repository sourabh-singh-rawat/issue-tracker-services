export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  IdentitySyncConsumer: Symbol.for("IdentitySyncConsumer"),
} as const;
