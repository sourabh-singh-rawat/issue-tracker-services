import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { Auth } from "@issue-tracker/security";
import { AwilixDi } from "@issue-tracker/server-core";
import { RegisteredServices } from "..";

export const issueRoutes = (container: AwilixDi<RegisteredServices>) => {
  return (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    const controller = container.get("issueController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const auth: RouteShorthandOptions = {
      preHandler: [requireTokens, setCurrentUser, requireAuth],
    };

    fastify.post("/", auth, controller.createIssue);
    fastify.get("/", auth, controller.getIssueList);
    fastify.get("/priority", auth, controller.getIssuePriorityList);
    fastify.get("/status", auth, controller.getIssueStatusList);
    fastify.get("/:id", auth, controller.getIssue);
    fastify.patch("/:id", auth, controller.updateIssue);
    fastify.patch("/:id/status", auth, controller.updateIssueStatus);
    fastify.patch("/:id/resolution", auth, controller.updateIssueResolution);

    done();
  };
};
