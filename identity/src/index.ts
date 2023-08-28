import { app } from "./app";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const main = async () => {
  try {
    await app.listen({ port: SERVER_PORT, host: SERVER_HOST });
  } catch (error) {
    app.log.error("Identity service cannot start", error);
    process.exit(1);
  }
};

main();
