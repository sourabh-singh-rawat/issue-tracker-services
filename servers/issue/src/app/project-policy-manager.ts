import {
  CasbinPolicyManager,
  IssuePermissions,
  ProjectRoles,
  UnauthorizedError,
  logger,
} from "@sourabhrawatcc/core-utils";
import { FastifyReply, FastifyRequest } from "fastify";

export class IssueCasbinPolicyManager extends CasbinPolicyManager<IssuePermissions> {
  createIssuePolicies = async (userId: string, projectId: string) => {
    const ownerRole = `${projectId}:${ProjectRoles.Owner}`;
    const adminRole = `${projectId}:${ProjectRoles.Admin}`;
    const memberRole = `${projectId}:${ProjectRoles.Member}`;

    await this.saveGroupingPolicy(ownerRole, adminRole);
    await this.saveGroupingPolicy(ownerRole, memberRole);
    await this.saveGroupingPolicy(adminRole, memberRole);

    await this.savePolicy(memberRole, projectId, IssuePermissions.View);
    await this.savePolicy(adminRole, projectId, IssuePermissions.Edit);
    await this.savePolicy(ownerRole, projectId, IssuePermissions.Archive);

    await this.saveRoleForUser(userId, ownerRole);
  };

  hasViewPermission = (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    done: () => void,
  ) => {
    const { id } = request.params;
    const { userId } = request.currentUser;

    const isValid = this.enforce(userId, id, IssuePermissions.View);
    if (!isValid)
      throw new UnauthorizedError("Does not have permission to view");
    done();
  };
}

export const issuePolicyManager = new IssueCasbinPolicyManager(logger);
