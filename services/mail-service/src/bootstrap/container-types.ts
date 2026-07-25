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
  UserRegisteredSubscriber: Symbol.for("UserRegisteredSubscriber"),
  ProjectMemberInvitedSubscriber: Symbol.for("ProjectMemberInvitedSubscriber"),
  WorkspaceMemberInvitedSubscriber: Symbol.for("WorkspaceMemberInvitedSubscriber"),
} as const;
