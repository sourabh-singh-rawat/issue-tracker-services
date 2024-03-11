import { container } from "./app/containers";
import { server } from "./app/servers";
import { WorkspaceMemberPermissions } from "./app/entities/workspace-member-permission.entity";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("store").connect();
    await container.get("messenger").connect();
    await container
      .get("workspaceGuardian")
      .initialize(container.get("dbSource"), {
        customCasbinRuleEntity: WorkspaceMemberPermissions,
      });

    server.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("userUpdatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
