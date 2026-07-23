import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Base GraphQL context shared across services.
 * Services may treat this as their context type or extend it via declaration merging.
 */
export interface GraphQLContext {
  req: FastifyRequest;
  rep: FastifyReply;
  user?: { email: string; userId: string };
}
