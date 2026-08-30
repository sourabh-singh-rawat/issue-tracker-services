export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  NotificationIdentitySyncConsumer: Symbol.for("NotificationIdentitySyncConsumer"),
} as const;
