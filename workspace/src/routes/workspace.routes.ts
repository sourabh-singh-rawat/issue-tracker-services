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
/**
 * 
  await e.addGroupingPolicy("workspace:admin", "workspace:viewer");
  await e.addGroupingPolicy("workspace:admin", "workspace:editor");

  // this
  await e.addPolicy(
    "workspace:viewer",
    "88f84bc7-810e-4d3e-92c5-fbaf562a6cdb",
    "workspace:view"
  );
  await e.addPolicy(
    "workspace:editor",
    "88f84bc7-810e-4d3e-92c5-fbaf562a6cdb",
    "workspace:edit"
  );
  await e.addPolicy(
    "workspace:admin",
    "88f84bc7-810e-4d3e-92c5-fbaf562a6cdb",
    "workspace:delete"
  );
  await e.addRoleForUser(
    "cd30c42a-2451-44f2-8437-79bccfef2315",
    "workspace:admin",
    "88f84bc7-810e-4d3e-92c5-fbaf562a6cdb"
  );

  console.log(
    await e.enforce(
      "cd30c42a-2451-44f2-8437-79bccfef2315",
      "88f84bc7-810e-4d3e-92c5-fbaf562a6cdb",
      "workspace:view"
    )
  );
 */
