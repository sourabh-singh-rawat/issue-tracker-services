import { container } from "./app/containers";
import { server } from "./app/servers";

const startServer = async () => {
  try {
    await container.initialize();
    await container.get("store").connect();
    await container.get("messenger").connect();

    server.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
