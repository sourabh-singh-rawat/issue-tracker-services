import "reflect-metadata";
import "@/bootstrap/env";

import { TYPES, broker, container, initializeDb } from "@/bootstrap";
import { ProjectMemberInviteConsumer } from "@/features/project-email";
import { UserRegisteredConsumer } from "@/features/user-email";
import { IdentitySyncConsumer } from "@/features/user";

export { container, db } from "@/bootstrap";

const startConsumers = () => {
  void container.get<UserRegisteredConsumer>(TYPES.UserRegisteredConsumer).start();
  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
  void container.get<ProjectMemberInviteConsumer>(TYPES.ProjectMemberInviteConsumer).start();
};

const main = async () => {
  await initializeDb();
  await broker.init();
  startConsumers();
};

main().catch((error) => {
  console.log(error);
});
