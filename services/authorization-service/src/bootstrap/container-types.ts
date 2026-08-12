export const TYPES = {
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  HttpServer: Symbol.for("IHttpServer"),
  AuthorizationService: Symbol.for("IAuthorizationService"),
  AuthorizationClient: Symbol.for("IAuthorizationClient"),
  KetoClient: Symbol.for("KetoClient"),
  AuthorizationGraphProvider: Symbol.for("IAuthorizationGraphProvider"),
  PlatformRoleCapabilitySyncConsumer: Symbol.for("PlatformRoleCapabilitySyncConsumer"),
  PlatformRoleAssignmentSyncConsumer: Symbol.for("PlatformRoleAssignmentSyncConsumer"),
} as const;
