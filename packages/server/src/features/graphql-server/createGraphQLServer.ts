import { ApolloGraphQLServer } from "./ApolloGraphQLServer";
import type { GraphQLServerOptions, IGraphQLServer } from "./IGraphQLServer";

export const createGraphQLServer = (options: GraphQLServerOptions): IGraphQLServer =>
  new ApolloGraphQLServer(options);
