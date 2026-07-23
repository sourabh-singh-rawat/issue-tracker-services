import {
  ApolloGateway,
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import type { FastifyReply } from "fastify";
import { readFileSync } from "node:fs";
import path from "node:path";

export type GatewayContext = {
  cookie?: string;
  reply?: FastifyReply;
};

type SubgraphHttpHeaders = {
  get: (name: string) => string | null;
  getSetCookie?: () => string[];
  raw?: () => Record<string, string | string[] | undefined>;
};

const hasHttpHeaders = (http: unknown): http is { headers: SubgraphHttpHeaders } => {
  if (typeof http !== "object" || http === null) return false;
  if (!("headers" in http)) return false;

  const { headers } = http;
  return typeof headers === "object" && headers !== null && "get" in headers;
};

const getSetCookieHeaders = (http: unknown): string[] => {
  if (!hasHttpHeaders(http)) return [];

  const { headers } = http;

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  if (typeof headers.raw === "function") {
    const raw = headers.raw()["set-cookie"];
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    return [raw];
  }

  const single = headers.get("set-cookie");
  if (!single) return [];
  return [single];
};

const appendSetCookieHeader = (reply: FastifyReply, cookie: string): void => {
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
};

class SubgraphDataSource extends RemoteGraphQLDataSource<GatewayContext> {
  willSendRequest = (options: GraphQLDataSourceProcessOptions<GatewayContext>) => {
    const cookie = options.context?.cookie;
    if (!cookie) return;

    options.request.http?.headers.set("cookie", cookie);
  };

  didReceiveResponse = (
    requestContext: Parameters<
      NonNullable<RemoteGraphQLDataSource<GatewayContext>["didReceiveResponse"]>
    >[0],
  ) => {
    const { response, context } = requestContext;
    if (!context.reply) return response;

    for (const cookie of getSetCookieHeaders(response.http)) {
      appendSetCookieHeader(context.reply, cookie);
    }

    return response;
  };
}

const supergraphPath = path.join(process.cwd(), "dist", "supergraph.graphql");
const supergraphSdl = readFileSync(supergraphPath, "utf8");

export const graphqlGateway = new ApolloGateway({
  supergraphSdl,
  buildService: ({ url }) => new SubgraphDataSource({ url }),
});
