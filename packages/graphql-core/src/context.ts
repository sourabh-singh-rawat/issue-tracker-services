import { FastifyReply, FastifyRequest } from "fastify";

export interface GraphQLContext {
  req: FastifyRequest;
  rep: FastifyReply;
  user?: { id: string; email?: string; authMethod: "access_token" | "session" };
}
