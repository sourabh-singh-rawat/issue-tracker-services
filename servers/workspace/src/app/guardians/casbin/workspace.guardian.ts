import {
  Guardian,
  UnauthorizedError,
  WorkspacePermissions,
  WorkspaceRoles,
  logger,
} from "@sourabhrawatcc/core-utils";

export class WorkspaceGuardian extends Guardian<WorkspacePermissions> {
  createWorkspacePolicies = async (userId: string, workspaceId: string) => {
    const ownerRole = `${workspaceId}:${WorkspaceRoles.Owner}`;
    const adminRole = `${workspaceId}:${WorkspaceRoles.Admin}`;
    const memberRole = `${workspaceId}:${WorkspaceRoles.Member}`;

    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, workspaceId, WorkspacePermissions.View);
    await this.savePolicy(adminRole, workspaceId, WorkspacePermissions.Edit);
    await this.savePolicy(adminRole, workspaceId, WorkspacePermissions.Invite);
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

  validatePermission = async (
    userId: string,
    workspaceId: string,
    permission: WorkspacePermissions,
  ) => {
    const isValid = this.enforce(userId, workspaceId, permission);
    if (!isValid) {
      let errorMessage = "";
      switch (permission) {
        case WorkspacePermissions.Create:
          errorMessage = "Does not have permission to create workspace";
          break;
        case WorkspacePermissions.View:
          errorMessage = "Does not have permission to view";
          break;
        case WorkspacePermissions.Invite:
          errorMessage = "Does not have permission to invite";
          break;
      }

      throw new UnauthorizedError(errorMessage);
    }
  };
}

export const workspaceGuardian = new WorkspaceGuardian(logger);
