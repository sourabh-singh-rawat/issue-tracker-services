import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { serviceContainer } from "../app/service-container";
import { Auth } from "@sourabhrawatcc/core-utils";

export const issueCommentRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: unknown,
  done: () => void,
) => {
  const { requireTokens, setCurrentUser, requireAuth } = Auth;
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.post("/:id/attachments", auth, () => {});
  fastify.get("/:id/attachments", auth, () => {});
  fastify.get("/:id/attachments/:attachmentId", auth, () => {});

  done();
};
