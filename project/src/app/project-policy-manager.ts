import {
  CasbinPolicyManager,
  ProjectPermissions,
  ProjectRoles,
  UnauthorizedError,
  logger,
} from "@sourabhrawatcc/core-utils";
import { FastifyReply, FastifyRequest } from "fastify";

export class ProjectCasbinPolicyManager extends CasbinPolicyManager<ProjectPermissions> {
  createProjectPolicies = async (userId: string, projectId: string) => {
    const ownerRole = `${projectId}:${ProjectRoles.Owner}`;
    const adminRole = `${projectId}:${ProjectRoles.Admin}`;
    const memberRole = `${projectId}:${ProjectRoles.Member}`;

    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, projectId, ProjectPermissions.View);
    await this.savePolicy(adminRole, projectId, ProjectPermissions.Edit);
    await this.savePolicy(ownerRole, projectId, ProjectPermissions.Archive);

    await this.saveRoleForUser(userId, ownerRole);
  };

  hasViewPermission = (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    done: () => void,
  ) => {
    const { id } = request.params;
    const { userId } = request.currentUser;

    const isValid = this.enforce(userId, id, ProjectPermissions.View);
    if (!isValid)
      throw new UnauthorizedError("Does not have permission to view");
    done();
  };
}

export const projectPolicyManager = new ProjectCasbinPolicyManager(logger);
