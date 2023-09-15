import { app } from "./app/app.config";

const SERVER_PORT = 4000;
const SERVER_HOST = "0.0.0.0";
const main = () => {
  app.listen({ port: SERVER_PORT, host: SERVER_HOST });
};

main();
