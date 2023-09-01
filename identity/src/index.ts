import { app, dataSource } from "./app";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const main = async () => {
  try {
    await app.listen({ port: SERVER_PORT, host: SERVER_HOST });
    await dataSource.connect();
    app.log.info("Server connected to postgres server");
  } catch (error) {
    console.log(error);
    app.log.error("Identity service cannot start");
    process.exit(1);
  }
};

main();
