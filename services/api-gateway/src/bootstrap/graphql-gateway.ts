import {
  ApolloGateway,
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { readFileSync, watch } from "node:fs";
import path from "node:path";

import { customFetcher } from "./custom-fetcher";

export type GatewayContext = {
  identityId?: string;
  authMethod?: string;
};

class SubgraphDataSource extends RemoteGraphQLDataSource<GatewayContext> {
  constructor(options: { url?: string }) {
    super({ ...options, fetcher: customFetcher });
  }

  willSendRequest = (options: GraphQLDataSourceProcessOptions<GatewayContext>) => {
    const identityId = options.context?.identityId;
    if (identityId) {
      options.request.http?.headers.set("x-identity-id", identityId);
    }

    const authMethod = options.context?.authMethod;
    if (authMethod) {
      options.request.http?.headers.set("x-identity-auth-method", authMethod);
    }
  };
}

const supergraphPath = path.join(process.cwd(), "dist", "supergraph.graphql");

const readSupergraphSdl = (): string => {
  const sdl = readFileSync(supergraphPath, "utf8").trim();
  if (!sdl) {
    throw new Error(
      `Empty supergraph at ${supergraphPath}. Run \`pnpm schemas:compose\` (or \`pnpm schemas:watch\`) after subgraph services have written dist/schema.graphql.`,
    );
  }
  return sdl;
};

export const graphqlGateway = new ApolloGateway({
  async supergraphSdl({ update }) {
    let debounce: ReturnType<typeof setTimeout> | null = null;
    const watcher = watch(supergraphPath, () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        try {
          update(readSupergraphSdl());
          console.log(`[api-gateway] Reloaded supergraph from ${supergraphPath}`);
        } catch (err) {
          console.warn(
            `[api-gateway] Supergraph reload skipped: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      }, 200);
    });

    return {
      supergraphSdl: readSupergraphSdl(),
      cleanup: async () => {
        if (debounce) clearTimeout(debounce);
        watcher.close();
      },
    };
  },
  buildService: ({ url }) => new SubgraphDataSource({ url }),
});
