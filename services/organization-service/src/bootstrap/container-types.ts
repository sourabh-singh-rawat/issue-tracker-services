export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  OrganizationRepository: Symbol.for("IOrganizationRepository"),
  OrganizationService: Symbol.for("IOrganizationService"),
} as const;
