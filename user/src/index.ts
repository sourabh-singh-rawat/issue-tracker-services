import { container } from "./app/service-container";
import { httpServer } from "./app/http-server";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await container.connect();
    await container.get("databaseService").connect();
    await container.get("messageService").connect();

    httpServer.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const main = async () => {
  await startServer();
};

main();
