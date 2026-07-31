export const TYPES = {
  Database: Symbol.for("Database"),
  Logger: Symbol.for("Logger"),
  Broker: Symbol.for("Broker"),
  Publisher: Symbol.for("Publisher"),
  Mailer: Symbol.for("Mailer"),
  IdentityRepository: Symbol.for("IIdentityRepository"),
  EmailRepository: Symbol.for("IEmailRepository"),
  UserEmailService: Symbol.for("IUserEmailService"),
  ProjectEmailService: Symbol.for("IProjectEmailService"),
  UserRegisteredConsumer: Symbol.for("UserRegisteredConsumer"),
  IdentitySyncConsumer: Symbol.for("IdentitySyncConsumer"),
  ProjectMemberInviteConsumer: Symbol.for("ProjectMemberInviteConsumer"),
} as const;
