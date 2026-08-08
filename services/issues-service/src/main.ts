import "reflect-metadata";

import type { IHttpServer } from "@pine/http";
import type { IOutboxCleanupWorker, IOutboxWorker } from "@pine/outbox";
import { broker, container, initializeDb, TYPES } from "@/bootstrap";
import { fastifyServer } from "@/bootstrap/fastify";
import { createGraphQL, writeSchemaToDist } from "@/bootstrap/graphql";
import { logger } from "@/bootstrap/logger";
import { IdentitySyncConsumer } from "@/features/identities";

export { container, db } from "@/bootstrap";
export { builder, createContext } from "@/graphql";
export type { IssuesContext } from "@/graphql";
export { schema } from "@/graphql/schema";

const main = async () => {
  await initializeDb();

  writeSchemaToDist();

  fastifyServer.route(await createGraphQL(fastifyServer));

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Issues service listening on http://0.0.0.0:5001");

  await broker.init();

  void container.get<IOutboxWorker>(TYPES.OutboxWorker).start();
  void container.get<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker).start();
  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
};

main().catch((error) => {
  console.log(error);
});
