export const TYPES = {
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  HttpServer: Symbol.for("IHttpServer"),
  AuthorizationService: Symbol.for("IAuthorizationService"),
  AuthorizationClient: Symbol.for("IAuthorizationClient"),
  KetoClient: Symbol.for("KetoClient"),
  AuthorizationGraphProvider: Symbol.for("IAuthorizationGraphProvider"),
  TenantSyncConsumer: Symbol.for("TenantSyncConsumer"),
  PlatformRelationSyncConsumer: Symbol.for("PlatformRelationSyncConsumer"),
  AuthorizationProfileSyncConsumer: Symbol.for("AuthorizationProfileSyncConsumer"),

} as const;

