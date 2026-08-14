export const TYPES = {
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  HttpServer: Symbol.for("IHttpServer"),
  AuthorizationService: Symbol.for("IAuthorizationService"),
  AuthorizationClient: Symbol.for("IAuthorizationClient"),
  KetoClient: Symbol.for("KetoClient"),
  AuthorizationGraphProvider: Symbol.for("IAuthorizationGraphProvider"),
  PlatformRolePermissionSyncConsumer: Symbol.for("PlatformRolePermissionSyncConsumer"),
  PlatformMemberSyncConsumer: Symbol.for("PlatformMemberSyncConsumer"),
  TenantMemberSyncConsumer: Symbol.for("TenantMemberSyncConsumer"),
  TenantSyncConsumer: Symbol.for("TenantSyncConsumer"),
} as const;

