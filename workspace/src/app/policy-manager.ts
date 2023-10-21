import {
  CasbinPolicyManager,
  UnauthorizedError,
  WorkspacePermissions,
  WorkspaceRoles,
  logger,
} from "@sourabhrawatcc/core-utils";
import { FastifyReply, FastifyRequest } from "fastify";

export class WorkspaceCasbinPolicyManager extends CasbinPolicyManager<WorkspacePermissions> {
  createWorkspacePolicies = async (userId: string, workspaceId: string) => {
    const ownerRole = `${workspaceId}:${WorkspaceRoles.Owner}`;
    const adminRole = `${workspaceId}:${WorkspaceRoles.Admin}`;
    const memberRole = `${workspaceId}:${WorkspaceRoles.Member}`;

    // Important grouping
    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, workspaceId, WorkspacePermissions.View);
    await this.savePolicy(adminRole, workspaceId, WorkspacePermissions.Edit);
    await this.savePolicy(ownerRole, workspaceId, WorkspacePermissions.Archive);

    await this.saveRoleForUser(userId, ownerRole);
  };

  createWorkspaceAdmin = async (userId: string, workspaceId: string) => {
    const adminRole = `${workspaceId}:${WorkspaceRoles.Admin}`;
    await this.saveRoleForUser(userId, adminRole);
  };

  createWorkspaceMember = async (userId: string, workspaceId: string) => {
    const memberRole = `${workspaceId}:${WorkspaceRoles.Member}`;
    await this.saveRoleForUser(userId, memberRole);
  };

  // Prehandlers
  hasViewPermission = (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (!request.currentUser) {
      throw new UnauthorizedError("No current user");
    }
    const { id } = request.params;
    const { userId } = request.currentUser;
    const isValid = this.enforce(userId, id, WorkspacePermissions.View);
    if (!isValid) {
      throw new UnauthorizedError("Does not have permission to view");
    }
    done();
  };
}

export const policyManager = new WorkspaceCasbinPolicyManager(logger);
