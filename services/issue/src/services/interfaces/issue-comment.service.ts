import { ServiceResponse } from "@issue-tracker/common";
import { IssueCommentEntity } from "../../data/entities";

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
