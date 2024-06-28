import {
  FastifyInstance,
  FastifyPluginOptions,
  RouteShorthandOptions,
} from "fastify";
import { Auth } from "@issue-tracker/security";
import { RegisteredServices } from "..";
import { AwilixDi } from "@issue-tracker/server-core";

export const workspaceRoutes =
  (container: AwilixDi<RegisteredServices>) =>
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    const controller = container.get("workspaceController");
    const { requireTokens, setCurrentUser, requireAuth } = Auth;
    const auth: RouteShorthandOptions = {
      preHandler: [requireTokens, setCurrentUser, requireAuth],
    };

    fastify.post("/", auth, controller.createWorkspace);
    fastify.post("/invite", auth, controller.createWorkspaceInvite);
    fastify.get("/", auth, controller.getAllWorkspaces);
    fastify.get("/role", auth, controller.getWorkspaceRoleList);
    fastify.get("/:id", auth, controller.getWorkspace);
    fastify.get("/:id/invite/confirm", controller.confirmWorkspaceInvite);
    // fastify.get("/:id/members", controller.getWorkspaceMemberList);
    fastify.patch("/:id", controller.updateWorkspace);

    done();
  };
