import { container } from "./app/container.config";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await container.connect();
    await container.get("app").listen({ port: SERVER_PORT, host: SERVER_HOST });
    await container.get("dbContext").connect();
    await container.get("casbin").connect();
    await container.get("messageServer").connect();
  } catch (error) {
    container.get("logger").error(error);
    process.exit(1);
  }
};

const startSubscriptions = () => {
  const userCreatedSubscriber = container.get("userCreatedSubscriber");
  // const userUpdatedSubscriber = container.get("userUpdatedSubscriber");
  userCreatedSubscriber.fetchMessages();
  // userUpdatedSubscriber.fetchMessages();
};

const main = async () => {
  await startServer();
  startSubscriptions();
};

main();
