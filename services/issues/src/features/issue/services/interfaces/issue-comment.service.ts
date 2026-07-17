import { ServiceResponse } from "@pine/common";
import { IssueCommentEntity } from "../../entities/issue-comment.entity";

export interface IssueCommentService {
  createIssueComment(
    userId: string,
    issueId: string,
    description: string,
  ): Promise<void>;

  getIssueCommentList(
    issueId: string,
  ): Promise<ServiceResponse<IssueCommentEntity[]>>;

  deleteIssueComment(issueId: string): Promise<void>;
}
