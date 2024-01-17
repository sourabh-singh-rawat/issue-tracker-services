import { container } from "./app/containers/awilix.container";
import { fastifyServer } from "./app/servers/fastify.server";
import { IssuePermission } from "./data/entities/issue-permission.entity";
import { ProjectPermission } from "./data/entities/project-permission.entity";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("postgresTypeormStore").connect();
    await container.get("messenger").connect();
    await container
      .get("issueGuardian")
      .initialize(container.get("dataSource"), {
        customCasbinRuleEntity: IssuePermission,
      });
    await container
      .get("projectGuardian")
      .initialize(container.get("dataSource"), {
        customCasbinRuleEntity: ProjectPermission,
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
  container.get("projectCreatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
