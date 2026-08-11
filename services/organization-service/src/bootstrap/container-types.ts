export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  HttpServer: Symbol.for("IHttpServer"),
  AuthorizationClient: Symbol.for("IAuthorizationClient"),
  OrganizationRepository: Symbol.for("IOrganizationRepository"),
  OrganizationService: Symbol.for("IOrganizationService"),
} as const;
