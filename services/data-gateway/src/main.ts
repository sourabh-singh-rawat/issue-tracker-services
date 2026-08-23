import "reflect-metadata";

import type { IHttpServer } from "@pine/server";
import { bindHttpServer, container, env, TYPES } from "./bootstrap";

const main = async () => {
  await bindHttpServer();

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();

  console.log(`Data Gateway ready at ${env.DATA_GATEWAY_URL}`);
  console.log(`Proxy → attachment: ${env.ATTACHMENT_SERVICE_URL}  (/attachments)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
