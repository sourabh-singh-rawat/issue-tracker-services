import { serviceContainer } from "./app/service-container";
import { httpServer } from "./app/http-server";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await serviceContainer.initialize();
    // await serviceContainer.get("databaseService").connect();
    await serviceContainer.get("messageService").connect();
    // await serviceContainer
    //   .get("projectPolicyManager")
    //   .initialize(serviceContainer.get("dataSource"), {
    //     customCasbinRuleEntity: ProjectMemberPermissions,
    //   });

    httpServer.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    serviceContainer.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  serviceContainer.get("workspaceInviteCreatedSubsciber").fetchMessages();
  // serviceContainer.get("userUpdatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
