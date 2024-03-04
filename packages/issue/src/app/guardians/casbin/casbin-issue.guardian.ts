import {
  Guardian,
  IssuePermissions,
  IssueRoles,
  UnauthorizedError,
  logger,
} from "@sourabhrawatcc/core-utils";
import { FastifyReply, FastifyRequest } from "fastify";

export class CasbinIssueGuardian extends Guardian<IssuePermissions> {
  validatePermission = async (
    userId: string,
    issueId: string,
    permission: IssuePermissions,
  ) => {
    const isValid = this.enforce(userId, issueId, permission);

    if (!isValid) {
      let errorMessage = "Does not have permission";
      switch (permission) {
        case IssuePermissions.CreateComment:
          errorMessage = "Does not have permission to create a comment";
          break;
        case IssuePermissions.ViewComment:
          errorMessage = "Does not have permission to view a comment";
          break;
        case IssuePermissions.EditComment:
          errorMessage = "Does not have permission to edit a comment";
          break;
        case IssuePermissions.ArchiveComment:
          errorMessage = "Does not have permission to archive a comment";
          break;
      }

      throw new UnauthorizedError(errorMessage);
    }
  };

  createReporter = async (userId: string, issueId: string) => {
    const issueReporter = `${issueId}:${IssueRoles.Reporter}`;
    const issueReviewer = `${issueId}:${IssueRoles.Reviewer}`;
    const issueAssignee = `${issueId}:${IssueRoles.Assignee}`;

    await this.saveGroupingPolicy(issueReporter, issueReviewer);
    await this.saveGroupingPolicy(issueReviewer, issueAssignee);

    await this.savePolicy(issueReviewer, issueId, IssuePermissions.ViewIssue);
    await this.savePolicy(
      issueReviewer,
      issueId,
      IssuePermissions.EditIssueResolution,
    );
    await this.savePolicy(issueReviewer, issueId, IssuePermissions.EditIssue);
    await this.savePolicy(
      issueReviewer,
      issueId,
      IssuePermissions.ArchiveIssue,
    );
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.CreateAttachment,
    );
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.ViewAttachment,
    );
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.EditAttachment,
    );
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.ArchiveAttachment,
    );
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.CreateComment,
    );
    await this.savePolicy(issueAssignee, issueId, IssuePermissions.ViewComment);
    await this.savePolicy(issueAssignee, issueId, IssuePermissions.EditComment);
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.ArchiveComment,
    );
    await this.savePolicy(issueAssignee, issueId, IssuePermissions.CreateTask);
    await this.savePolicy(issueAssignee, issueId, IssuePermissions.ArchiveTask);
    await this.savePolicy(issueAssignee, issueId, IssuePermissions.ViewTask);
    await this.savePolicy(issueAssignee, issueId, IssuePermissions.EditTask);
    await this.savePolicy(
      issueAssignee,
      issueId,
      IssuePermissions.EditIssueStatus,
    );

    await this.saveRoleForUser(userId, issueReporter);
  };

  createAssignee = async (userId: string, issueId: string) => {
    const issueAssignee = `${issueId}:${IssueRoles.Assignee}`;

    await this.saveRoleForUser(userId, issueAssignee);
  };
}

export const issueGuardian = new CasbinIssueGuardian(logger);
