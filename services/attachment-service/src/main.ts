import "reflect-metadata";

import multipart from "@fastify/multipart";
import type { IHttpServer } from "@pine/http";
import { broker, container, initializeDb, logger, TYPES } from "@/bootstrap";
import { fastifyServer } from "@/bootstrap/fastify";
import { createGraphQL, writeSchemaToDist } from "@/bootstrap/graphql";
import { startImageWorker } from "@/bootstrap/image-worker";
import { registerSwagger, writeOpenApi } from "@/bootstrap/swagger";
import { IdentitySyncConsumer } from "@/features/identities";

export { container, db } from "@/bootstrap";
export { builder, createContext } from "@/graphql";
export type { AttachmentContext } from "@/graphql";
export { schema } from "@/graphql/schema";

const main = async () => {
  await initializeDb();

  writeSchemaToDist();

  await registerSwagger(fastifyServer);
  await fastifyServer.register(multipart, { limits: { fileSize: 32000000 } });
  fastifyServer.route(await createGraphQL(fastifyServer));

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Attachment service listening on http://0.0.0.0:5003");
  writeOpenApi(fastifyServer);

  await broker.init();

  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
  startImageWorker();
};

main().catch((error) => {
  console.log(error);
});
