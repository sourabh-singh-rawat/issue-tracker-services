import { configureTls } from "@pine/common";
import "reflect-metadata";
import { env } from "./bootstrap";

configureTls({ caPath: env.CA_CERT_PATH });

import type { IHttpServer } from "@pine/server";
import { container, TYPES } from "./bootstrap";

const main = async () => {
  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();

  console.log(`Data Gateway ready at ${env.DATA_GATEWAY_URL}`);
  console.log(`Proxy → attachment: ${env.ATTACHMENT_SERVICE_URL}  (/attachments)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
