import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { CoreHttpServer } from "@issue-tracker/server-core";
import fastify from "fastify";
import { readFileSync } from "fs";
import path from "path";

/**
 * Forward browser Cookie header to subgraphs (auth needs accessToken cookies).
 */
class SubgraphDataSource extends RemoteGraphQLDataSource {
  willSendRequest({
    request,
    context,
  }: {
    request: { http?: { headers: { set(name: string, value: string): void } } };
    context: { cookie?: string };
  }) {
    if (context.cookie) {
      request.http?.headers.set("cookie", context.cookie);
    }
  }
}

const main = async () => {
  const supergraphPath = path.join(__dirname, "..", "supergraph.graphql");
  const supergraphSdl = readFileSync(supergraphPath, "utf8");

  const gateway = new ApolloGateway({
    supergraphSdl,
    buildService({ url }) {
      return new SubgraphDataSource({ url });
    },
  });

  const apollo = new ApolloServer({ gateway });
  const httpServer = new CoreHttpServer({
    graphql: {
      path: "/graphql",
      apollo,
      createContext: async (req: { headers: { cookie?: string } }) => ({
        cookie: req.headers.cookie,
      }),
    },
    cors: {
      credentials: true,
      origin: process.env.ISSUE_TRACKER_CLIENT_URL ?? "http://localhost:3000",
    },
    config: {
      // Bind IPv4 explicitly so Vite on localhost:3000 can always reach us
      host: "0.0.0.0",
      port: 4000,
      environment: "development",
      version: 1,
    },
    server: fastify(),
  });

  await httpServer.start();
  console.log(`🚀 Gateway ready at http://127.0.0.1:4000/graphql`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
