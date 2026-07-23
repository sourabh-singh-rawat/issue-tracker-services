import { ApolloServer } from "@apollo/server";
import { graphqlGateway } from "./graphql-gateway";

export const graphqlServer = new ApolloServer({ gateway: graphqlGateway });
