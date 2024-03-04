import { container } from "./app/containers";
import { fastifyServer } from "./app/servers/fastify.server";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("postgresTypeormStore").connect();
    await container.get("messenger").connect();

    fastifyServer.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("userUpdatedSubscriber").fetchMessages();
  container.get("projectCreatedSubscriber").fetchMessages();
  container.get("projectUpdatedSubscriber").fetchMessages();
  container.get("issueCreatedSubscriber").fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
