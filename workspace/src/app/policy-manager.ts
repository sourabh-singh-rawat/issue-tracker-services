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
    const adminRole = `${workspaceId}:${WorkspaceRoles.Admin}`;
    const viewerRole = `${workspaceId}:${WorkspaceRoles.Viewer}`;
    const editorRole = `${workspaceId}:${WorkspaceRoles.Editor}`;

    // Important grouping
    await this.saveGroupingPolicy(adminRole, editorRole);
    await this.saveGroupingPolicy(adminRole, viewerRole);
    await this.saveGroupingPolicy(editorRole, viewerRole);

    await this.savePolicy(viewerRole, workspaceId, WorkspacePermissions.View);
    await this.savePolicy(editorRole, workspaceId, WorkspacePermissions.Edit);
    await this.savePolicy(adminRole, workspaceId, WorkspacePermissions.Delete);

    await this.saveRoleForUser(userId, adminRole);
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
