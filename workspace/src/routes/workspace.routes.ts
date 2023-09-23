import { FastifyInstance } from "fastify";
import { container } from "../app/container.config";

export const workspaceRoutes = (
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) => {
  const workspaceController = container.get("workspaceController");

  fastify.get("/", workspaceController.getAllWorkspaces);
  fastify.post("/", workspaceController.createWorkspace);

  done();
};
