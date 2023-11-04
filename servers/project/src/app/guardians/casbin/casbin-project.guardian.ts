import {
  Guardian,
  ProjectPermissions,
  ProjectRoles,
  UnauthorizedError,
  logger,
} from "@sourabhrawatcc/core-utils";
import { ProjectGuardian } from "./interfaces/project-guardian";
import { dataSource } from "../../stores/postgres-typeorm.store";

export class CasbinProjectGuardian
  extends Guardian<ProjectPermissions>
  implements ProjectGuardian
{
  constructor() {
    super(logger);
  }

  createOwner = async (userId: string, projectId: string) => {
    const { Owner, Admin, Member } = ProjectRoles;
    const { View, Edit, Invite, Archive } = ProjectPermissions;
    const ownerRole = `${projectId}:${Owner}`;
    const adminRole = `${projectId}:${Admin}`;
    const memberRole = `${projectId}:${Member}`;

    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, projectId, View);
    await this.savePolicy(adminRole, projectId, Edit);
    await this.savePolicy(adminRole, projectId, Invite);
    await this.savePolicy(ownerRole, projectId, Archive);

    await this.saveRoleForUser(userId, ownerRole);
  };

  createAdmin = async (userId: string, projectId: string) => {
    const adminRole = `${projectId}:${ProjectRoles.Admin}`;
    await this.saveRoleForUser(userId, adminRole);
  };

  createMember = async (userId: string, projectId: string) => {
    const memberRole = `${projectId}:${ProjectRoles.Member}`;
    await this.saveRoleForUser(userId, memberRole);
  };

  validatePermission = async (
    userId: string,
    projectId: string,
    permission: ProjectPermissions,
  ) => {
    console.log(userId, projectId, permission);
    const isValid = this.enforce(userId, projectId, permission);
    if (!isValid) {
      let errorMessage = "";
      switch (permission) {
        case ProjectPermissions.Create:
          errorMessage = "Does not have permission to create";
          break;
        case ProjectPermissions.View:
          errorMessage = "Does not have permission to view";
          break;
        case ProjectPermissions.Invite:
          errorMessage = "Does not have permission to invite";
          break;
      }

      throw new UnauthorizedError(errorMessage);
    }
  };
}
