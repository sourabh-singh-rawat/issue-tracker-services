import { serviceContainer } from "./app/service-container";
import { httpServer } from "./app/http-server";
import { WorkspaceMemberRoles } from "./data/entities/workspace-member-roles";

const startServer = async () => {
  try {
    // Connect to necessary services
    await serviceContainer.initialize();
    await serviceContainer.get("databaseService").connect();
    await serviceContainer.get("messageService").connect();
    await serviceContainer
      .get("policyManager")
      .initialize(serviceContainer.get("dbSource"), {
        customCasbinRuleEntity: WorkspaceMemberRoles,
      });

    // Start the server
    httpServer.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    serviceContainer.get("logger").error(error);
    process.exit(1);
  }
};

// Start message subscription
const startSubscriptions = () => {
  const userCreatedSubscriber = serviceContainer.get("userCreatedSubscriber");
  userCreatedSubscriber.fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
