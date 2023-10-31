import {
  CasbinPolicyManager,
  WorkspaceRoles,
  UnauthorizedError,
  WorkspacePermissions,
  logger,
} from "@sourabhrawatcc/core-utils";
import { FastifyReply, FastifyRequest } from "fastify";

export class WorkspaceCasbinPolicyManager extends CasbinPolicyManager<WorkspacePermissions> {
  crateProjectPolicies = async (userId: string, projectId: string) => {
    const ownerRole = `${projectId}:${WorkspaceRoles.Owner}`;
    const adminRole = `${projectId}:${WorkspaceRoles.Admin}`;
    const memberRole = `${projectId}:${WorkspaceRoles.Member}`;

    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, projectId, WorkspacePermissions.View);
    await this.savePolicy(adminRole, projectId, WorkspacePermissions.Edit);
    await this.savePolicy(adminRole, projectId, WorkspacePermissions.Archive);

    await this.saveRoleForUser(userId, ownerRole);
  };

  // Prehandlers
  hasViewPermission = (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (!request.currentUser) throw new UnauthorizedError("No current user");
    const { id } = request.params;
    const { userId } = request.currentUser;

    const isValid = this.enforce(userId, id, WorkspacePermissions.View);
    if (!isValid)
      throw new UnauthorizedError("Does not have permission to view");
    done();
  };
}

export const policyManager = new WorkspaceCasbinPolicyManager(logger);
