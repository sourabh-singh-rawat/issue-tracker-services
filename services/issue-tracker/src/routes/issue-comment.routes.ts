import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import { RegisteredServices } from "..";

export const issueCommentRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("issueCommentController");
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
};
