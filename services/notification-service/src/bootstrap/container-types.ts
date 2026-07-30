export const TYPES = {
  DataSource: Symbol.for("DataSource"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  Orm: Symbol.for("Orm"),
  Mailer: Symbol.for("Mailer"),
  UserEmailService: Symbol.for("IUserEmailService"),
  ProjectEmailService: Symbol.for("IProjectEmailService"),
  WorkspaceEmailService: Symbol.for("IWorkspaceEmailService"),
  UserRegisteredConsumer: Symbol.for("UserRegisteredConsumer"),
  ProjectMemberInviteConsumer: Symbol.for("ProjectMemberInviteConsumer"),
  WorkspaceInviteConsumer: Symbol.for("WorkspaceInviteConsumer"),
} as const;
