import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { CoreHttpServer } from "@issue-tracker/server-core";
import fastify from "fastify";
import { readFileSync } from "fs";

const main = async () => {
  const supergraphSdl = readFileSync("./supergraph.graphql").toString();
  const gateway = new ApolloGateway({ supergraphSdl });

  const apollo = new ApolloServer({ gateway });
  const httpServer = new CoreHttpServer({
    graphql: { path: "/graphql", apollo, createContext: () => ({}) },
    config: {
      host: "localhost",
      port: 4000,
      environment: "development",
      version: 1,
    },
    server: fastify(),
  });

  await httpServer.start();
  console.log(`🚀 Gateway ready`);
};

main();
