import { ApolloServer, type BaseContext } from "@apollo/server";
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from "@as-integrations/fastify";
import type { FastifyInstance, RouteOptions } from "fastify";
import { lexicographicSortSchema, printSchema } from "graphql";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";

export const createGraphQL = async (server: FastifyInstance): Promise<RouteOptions> => {
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(server)],
  });
  await apollo.start();

  return {
    url: "/graphql",
    method: ["POST", "GET"],
    schema: { hide: true },
    handler: fastifyApolloHandler(apollo, { context: createContext }),
  };
};

export const writeSchemaToDist = (): void => {
  const schemaPath = path.join(process.cwd(), "dist", "schema.graphql");
  mkdirSync(path.dirname(schemaPath), { recursive: true });
  writeFileSync(schemaPath, printSchema(lexicographicSortSchema(schema)));
};
