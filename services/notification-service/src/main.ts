import "reflect-metadata";
import "@/bootstrap/env";

import { TYPES, broker, container, orm } from "@/bootstrap";
import { ProjectMemberInviteConsumer } from "@/features/project-email";
import { UserRegisteredConsumer } from "@/features/user-email";
import { WorkspaceInviteConsumer } from "@/features/workspace-email";

export { container, dataSource } from "@/bootstrap";

const startConsumers = () => {
  void container.get<UserRegisteredConsumer>(TYPES.UserRegisteredConsumer).start();
  void container.get<ProjectMemberInviteConsumer>(TYPES.ProjectMemberInviteConsumer).start();
  void container.get<WorkspaceInviteConsumer>(TYPES.WorkspaceInviteConsumer).start();
};

const main = async () => {
  await orm.init();
  await broker.init();
  startConsumers();
};

main().catch((error) => {
  console.log(error);
});
