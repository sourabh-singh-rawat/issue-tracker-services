import "./env";
import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import { AwilixDi, CoreHttpServer } from "@pine/server-core";
import fastify from "fastify";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import {
  RegisteredServices,
  broker,
  container,
  dataSource,
  logger,
} from "./container";
import { createContext } from "./graphql";
import { schema } from "./graphql/schema";

export { builder, createContext } from "./graphql";
export type { AuthContext } from "./graphql";
export { schema } from "./graphql/schema";
export { container, dataSource } from "./container";

const startSubscriptions = (di: AwilixDi<RegisteredServices>) => {
  di.get("userEmailConfirmationSentSubscriber").fetchMessages();
};

const main = async () => {
  await dataSource.initialize();
  await broker.init();
  container.init();

  writeFileSync(
    "./schema.graphql",
    printSchema(lexicographicSortSchema(schema)),
  );

  const instance = fastify();
  const apollo = new ApolloServer<any>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  const server = new CoreHttpServer({
    server: instance,
    config: {
      host: "0.0.0.0",
      port: parseInt(process.env.IDENTITY_SERVICE_PORT!),
      environment: "development",
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
