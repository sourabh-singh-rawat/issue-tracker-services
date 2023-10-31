import { serviceContainer } from "./app/service-container";
import { httpServer } from "./app/http-server";

const startServer = async () => {
  try {
    await serviceContainer.initialize();
    await serviceContainer.get("databaseService").connect();
    await serviceContainer.get("messageService").connect();

    httpServer.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    serviceContainer.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  serviceContainer.get("userCreatedSubscriber").fetchMessages();
  serviceContainer.get("userUpdatedSubscriber").fetchMessages();
  serviceContainer.get("projectCreatedSubscriber").fetchMessages();
  serviceContainer.get("projectUpdatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
