export const TYPES = {
  DataSource: Symbol.for("DataSource"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  Orm: Symbol.for("Orm"),
  UserService: Symbol.for("IUserService"),
  IssueService: Symbol.for("IIssueService"),
  ProjectService: Symbol.for("IProjectService"),
  StatusService: Symbol.for("IStatusService"),
  WorkspaceService: Symbol.for("IWorkspaceService"),
  UserSyncConsumer: Symbol.for("UserSyncConsumer"),
} as const;
