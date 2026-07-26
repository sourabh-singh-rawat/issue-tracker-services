import "reflect-metadata";
import "@/bootstrap/env";

import { TYPES, broker, container, orm } from "@/bootstrap";
import { ProjectMemberInvitedSubscriber } from "@/features/project-email";
import { UserRegisteredSubscriber } from "@/features/user-email";
import { WorkspaceMemberInvitedSubscriber } from "@/features/workspace-email";

export { container, dataSource } from "@/bootstrap";

const startSubscriptions = () => {
  container.get<UserRegisteredSubscriber>(TYPES.UserRegisteredSubscriber).fetchMessages();
  container
    .get<ProjectMemberInvitedSubscriber>(TYPES.ProjectMemberInvitedSubscriber)
    .fetchMessages();
  container
    .get<WorkspaceMemberInvitedSubscriber>(TYPES.WorkspaceMemberInvitedSubscriber)
    .fetchMessages();
};

const main = async () => {
  await orm.init();
  await broker.init();
  startSubscriptions();
};

main().catch((error) => {
  console.log(error);
});
