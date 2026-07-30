import { env, listenPortFromUrl } from "@/env";
import "reflect-metadata";

import { ApolloServer, BaseContext } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import { Environment } from "@pine/common";
import { FastifyHttpServer } from "@pine/http-core";
import fastify from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { lexicographicSortSchema, printSchema } from "graphql";
import { TYPES, broker, container, logger, orm } from "@/bootstrap";
import { UserSyncConsumer } from "@/features/user";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";

export type { IssuesContext } from "@/graphql";
export { container, dataSource } from "@/bootstrap";

const writeSchemaToDist = () => {
  const schemaPath = path.join(process.cwd(), "dist", "schema.graphql");
  mkdirSync(path.dirname(schemaPath), { recursive: true });
  writeFileSync(schemaPath, printSchema(lexicographicSortSchema(schema)));
};

const startConsumers = () => {
  void container.get<UserSyncConsumer>(TYPES.UserSyncConsumer).start();
};

const main = async () => {
  await orm.init();
  await broker.init();

  writeSchemaToDist();

  const instance = fastify();
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  const server = new FastifyHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.ISSUES_SERVICE_URL),
      environment: env.NODE_ENV as Environment,
      version: 1,
    },
    cors: { credentials: true, origin: env.ERP_WEB_URL },
    cookie: { secret: env.JWT_SECRET! },
    graphql: { apollo, path: "/graphql", createContext },
    logger,
  });

  await server.start();
  startConsumers();
};

main().catch((error) => {
  console.log(error);
});
