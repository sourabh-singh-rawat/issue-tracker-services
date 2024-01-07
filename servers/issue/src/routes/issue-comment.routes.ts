import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { serviceContainer } from "../app/containers/awilix.container";
import { Auth } from "@sourabhrawatcc/core-utils";

export const issueCommentRoutes = (
  fastify: FastifyInstance,
  fastifyOptions: unknown,
  done: () => void,
) => {
  const controller = serviceContainer.get("issueCommentController");
  const { requireTokens, setCurrentUser, requireAuth } = Auth;
  const auth: RouteShorthandOptions = {
    preHandler: [requireTokens, setCurrentUser, requireAuth],
  };

  fastify.post("/:id/comments", auth, controller.createIssueComment);
  fastify.get("/:id/comments", auth, controller.getIssueCommentList);
  fastify.delete(
    "/:id/comments/:commentId",
    auth,
    controller.deleteIssueComment,
  );

  done();
};
