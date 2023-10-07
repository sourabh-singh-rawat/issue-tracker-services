import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { serviceContainer } from "../app/service-container";

export const workspaceRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const workspaceController = serviceContainer.get("workspaceController");
  const p = serviceContainer.get("policyManager");

  fastify.get("/", workspaceController.getAllWorkspaces);
  fastify.get(
    "/:id",
    { preHandler: p.hasViewPermission },
    workspaceController.getWorkspace,
  );
  fastify.post("/", workspaceController.createWorkspace);

  done();
};
