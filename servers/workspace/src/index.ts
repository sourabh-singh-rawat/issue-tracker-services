import { container } from "./app/containers/awilix.container";
import { server } from "./app/servers/fastify.server";
import { WorkspaceMemberPermissions } from "./data/entities/workspace-member-permission.entity";

const startServer = async () => {
  try {
    // Connect to necessary services
    await container.initialize();
    await container.get("store").connect();
    await container.get("messenger").connect();
    await container
      .get("workspaceGuardian")
      .initialize(container.get("dbSource"), {
        customCasbinRuleEntity: WorkspaceMemberPermissions,
      });

    // Start the server
    server.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

// Start message subscription
const startSubscriptions = () => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("userUpdatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
