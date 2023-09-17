import { app } from "./app/app.config";
import { container } from "./app/container.config";
import { dataSource } from "./app/db.config";
import { messageServer } from "./app/message-system.config";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const main = async () => {
  try {
    await container.connect();
    await app.listen({ port: SERVER_PORT, host: SERVER_HOST });
    await dataSource.connect();
    await messageServer.connect();

    const userCreatedSubscriber = container.get("userCreatedSubscriber");
    await userCreatedSubscriber.fetchMessages();
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

main();
