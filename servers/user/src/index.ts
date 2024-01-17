import { container } from "./app/containers/awilix.container";
import { server } from "./app/servers/fastify.server";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("store").connect();
    await container.get("messenger").connect();

    server.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const main = async () => {
  await startServer();
};

main();
