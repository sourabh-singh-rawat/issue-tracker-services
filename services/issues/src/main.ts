import "./env";
import "reflect-metadata";

import { ApolloServer, BaseContext } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import { Environment } from "@pine/common";
import { AwilixDi, CoreHttpServer } from "@pine/server-core";
import fastify from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { lexicographicSortSchema, printSchema } from "graphql";
import { RegisteredServices, broker, container, logger, orm } from "./container";
import { createContext } from "./graphql";
import { schema } from "./graphql/schema";
export type { IssuesContext } from "./graphql";
export { container, dataSource } from "./container";

const writeSchemaToDist = () => {
  const schemaPath = path.join(process.cwd(), "dist", "schema.graphql");
  mkdirSync(path.dirname(schemaPath), { recursive: true });
  writeFileSync(schemaPath, printSchema(lexicographicSortSchema(schema)));
};

const startSubscriptions = (di: AwilixDi<RegisteredServices>) => {
  di.get("userEmailVerifiedSubscriber").fetchMessages();
};

const main = async () => {
  await orm.init();
  await broker.init();
  container.init();

  writeSchemaToDist();

  const instance = fastify();
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  const server = new CoreHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: Number.parseInt(process.env.ISSUE_TRACKER_SERVICE_PORT!),
      environment: process.env.NODE_ENV as Environment,
      version: 1,
    },
    cors: { credentials: true, origin: process.env.ISSUE_TRACKER_CLIENT_URL },
    cookie: { secret: process.env.JWT_SECRET! },
    graphql: { apollo, path: "/graphql", createContext },
    logger,
  });

  await server.start();
  startSubscriptions(container);
};

main().catch((error) => {
  console.log(error);
});
