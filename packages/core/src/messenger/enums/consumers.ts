export enum Consumers {
  UserCreatedConsumerActivity = "user-created-consumer-activity",
  UserCreatedConsumerEmail = "user-created-consumer-email",
  UserCreatedConsumerIdentity = "user-created-consumer-identity",
  UserCreatedConsumerIssue = "user-created-consumer-issue",
  UserCreatedConsumerProject = "user-created-consumer-project",
  UserCreatedConsumerWorkspace = "user-created-consumer-workspace",

  UserUpdatedConsumerActivity = "user-updated-consumer-activity",
  UserUpdatedConsumerIdentity = "user-updated-consumer-identity",
  UserUpdatedConsumerWorkspace = "user-updated-consumer-workspace",
  UserUpdatedConsumerProject = "user-updated-consumer-project",
  UserUpdatedConsumerIssue = "user-updated-consumer-issue",

  EmailCreatedConsumerUser = "email-created-consumer-user",

  ProjectCreatedConsumerIssue = "project-created-consumer-issue",
  ProjectCreatedConsumerActivity = "project-created-consumer-activity",
  ProjectMemberCreatedConsumerEmail = "project-member-created-consumer-email",
  ProjectUpdatedConsumerActivity = "project-updated-consumer-activity",

  IssueCreatedConsumerActivity = "issue-created-consumer-activity",

  WorkspaceCreatedConsumerProject = "workspace-created-consumer-project",
  WorkspaceUpdatedConsumerProject = "workspace-updated-consumer-project",

  WorkspaceInviteCreatedConsumerEmail = "workspace-invite-created-consumer-email",
}
