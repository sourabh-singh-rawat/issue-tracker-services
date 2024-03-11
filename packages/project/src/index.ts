import { container } from "./app/containers";
import { fastifyServer } from "./app/servers/fastify.server";
import { ProjectMemberPermissions } from "./app/entities";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("store").connect();
    await container.get("messenger").connect();
    await container
      .get("casbinProjectGuardian")
      .initialize(container.get("dataSource"), {
        customCasbinRuleEntity: ProjectMemberPermissions,
      });

    fastifyServer.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("userUpdatedSubscriber").fetchMessages();
  container.get("workspaceCreatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
