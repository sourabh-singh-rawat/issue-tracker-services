import { container } from "./app/containers";
import { server } from "./app/servers";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("store").connect();
    await container.get("messenger").connect();
    // await container
    //   .get("projectPolicyManager")
    //   .initialize(container.get("dataSource"), {
    //     customCasbinRuleEntity: ProjectMemberPermissions,
    //   });

    server.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("projectMemberCreatedSubscriber").fetchMessages();
  container.get("workspaceInviteCreatedSubsciber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
