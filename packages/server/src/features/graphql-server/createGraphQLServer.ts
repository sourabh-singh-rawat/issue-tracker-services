import type { BaseContext } from "@apollo/server";
import { ApolloGraphQLServer } from "./ApolloGraphQLServer";
import type { GraphQLServerOptions, IGraphQLServer } from "./IGraphQLServer";

export const createGraphQLServer = <TContext extends BaseContext = BaseContext>(
  options: GraphQLServerOptions<TContext>,
): IGraphQLServer => new ApolloGraphQLServer<TContext>(options);
