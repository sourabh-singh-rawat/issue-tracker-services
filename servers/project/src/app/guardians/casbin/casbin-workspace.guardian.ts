import {
  Guardian,
  WorkspaceRoles,
  UnauthorizedError,
  WorkspacePermissions,
  logger,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceGuardian } from "./interfaces/workspace-guardian";

export class CasbinWorkspaceGuardian
  extends Guardian<WorkspacePermissions>
  implements WorkspaceGuardian
{
  constructor() {
    super(logger);
  }

  createOwner = async (userId: string, projectId: string) => {
    const { Owner, Admin, Member } = WorkspaceRoles;
    const { View, Edit, Invite, Archive } = WorkspacePermissions;
    const ownerRole = `${projectId}:${Owner}`;
    const adminRole = `${projectId}:${Admin}`;
    const memberRole = `${projectId}:${Member}`;

    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, projectId, View);
    await this.savePolicy(adminRole, projectId, Edit);
    await this.savePolicy(adminRole, projectId, Invite);
    await this.savePolicy(adminRole, projectId, Archive);

    await this.saveRoleForUser(userId, ownerRole);
  };

  validatePermission = async (
    userId: string,
    projectId: string,
    permission: WorkspacePermissions,
  ) => {
    const isValid = this.enforce(userId, projectId, permission);
    if (!isValid) {
      let errorMessage = "";
      switch (permission) {
        case WorkspacePermissions.Create:
          errorMessage = "Does not have permission to create";
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
