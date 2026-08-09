import "reflect-metadata";

import type { IHttpServer } from "@pine/server";
import { broker, container, initializeDb, logger, TYPES } from "@/bootstrap";
import { openApiOutputPath } from "@/bootstrap/container";
import { writeSchemaToDist } from "@/bootstrap/graphql";
import { startImageWorker } from "@/bootstrap/image-worker";
import { IdentitySyncConsumer } from "@/features/identities";

export { container, db } from "@/bootstrap";
export { builder, createContext } from "@/graphql";
export type { AttachmentContext } from "@/graphql";
export { schema } from "@/graphql/schema";

const main = async () => {
  await initializeDb();

  writeSchemaToDist();

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Attachment service listening on http://0.0.0.0:5003");
  httpServer.writeOpenApi(openApiOutputPath);

  await broker.init();

  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
  startImageWorker();
};

main().catch((error) => {
  console.log(error);
});
