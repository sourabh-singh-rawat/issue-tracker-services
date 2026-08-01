import { FastifyReply, FastifyRequest } from "fastify";

export interface GraphQLContext {
  req: FastifyRequest;
  rep: FastifyReply;
  user?: { id: string; authMethod: "access_token" | "session" };
}
