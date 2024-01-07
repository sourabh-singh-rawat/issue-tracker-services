import { serviceContainer } from "./app/containers/awilix.container";
import { fastifyServer } from "./app/servers/fastify.server";
import { IssuePermission } from "./data/entities/issue-permission.entity";
import { ProjectPermission } from "./data/entities/project-permission.entity";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await serviceContainer.initialize();
    await serviceContainer.get("postgresTypeormStore").connect();
    await serviceContainer.get("messenger").connect();
    await serviceContainer
      .get("issueGuardian")
      .initialize(serviceContainer.get("dataSource"), {
        customCasbinRuleEntity: IssuePermission,
      });
    await serviceContainer
      .get("projectGuardian")
      .initialize(serviceContainer.get("dataSource"), {
        customCasbinRuleEntity: ProjectPermission,
      });
    fastifyServer.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    serviceContainer.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  serviceContainer.get("userCreatedSubscriber").fetchMessages();
  serviceContainer.get("userUpdatedSubscriber").fetchMessages();
  serviceContainer.get("projectCreatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
