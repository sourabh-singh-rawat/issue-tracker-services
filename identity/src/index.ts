import { app } from "./app";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";

const main = async () => {
  try {
    await app.listen({ port: SERVER_PORT, host: SERVER_HOST });

    console.log(`Identity service is up and running on port@${SERVER_PORT}`);
  } catch (error) {
    console.log("Identity service cannot start", error);
    process.exit(1);
  }
};

main();
