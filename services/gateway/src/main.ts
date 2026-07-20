import {
  ApolloGateway,
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { CoreHttpServer } from "@pine/server-core";
import { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import { readFileSync } from "fs";
import path from "path";

type GatewayContext = {
  cookie?: string;
  /** Present for real client requests; absent for health/schema loads. */
  reply?: FastifyReply;
};

type SubgraphHttpResponse = {
  headers: {
    get(name: string): string | null;
    getSetCookie?: () => string[];
    raw?: () => Record<string, string | string[] | undefined>;
  };
};

/**
 * Forward browser Cookie header to subgraphs (identity-service needs accessToken cookies)
 * and copy Set-Cookie headers from subgraph responses back to the client.
 */
class SubgraphDataSource extends RemoteGraphQLDataSource<GatewayContext> {
  willSendRequest(options: GraphQLDataSourceProcessOptions<GatewayContext>) {
    const cookie = (options.context as GatewayContext | undefined)?.cookie;
    if (cookie) {
      options.request.http?.headers.set("cookie", cookie);
    }
  }

  didReceiveResponse(
    requestContext: Parameters<
      NonNullable<RemoteGraphQLDataSource<GatewayContext>["didReceiveResponse"]>
    >[0],
  ) {
    const { response, context } = requestContext;
    if (context.reply) {
      for (const cookie of extractSetCookieHeaders(
        response.http as SubgraphHttpResponse | undefined,
      )) {
        appendSetCookie(context.reply, cookie);
      }
    }
    return response;
  }
}

function extractSetCookieHeaders(http?: SubgraphHttpResponse): string[] {
  if (!http?.headers) return [];

  const { headers } = http;

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  if (typeof headers.raw === "function") {
    const raw = headers.raw()["set-cookie"];
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [raw];
  }

  const single = headers.get("set-cookie");
  return single ? [single] : [];
}

function appendSetCookie(reply: FastifyReply, cookie: string) {
  const existing = reply.getHeader("set-cookie");

  if (!existing) {
    reply.header("set-cookie", cookie);
    return;
  }

  if (Array.isArray(existing)) {
    reply.header("set-cookie", [...existing.map(String), cookie]);
    return;
  }

  reply.header("set-cookie", [String(existing), cookie]);
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
      createContext: async (req: FastifyRequest, reply: FastifyReply) => ({
        cookie: req.headers.cookie,
        reply,
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
