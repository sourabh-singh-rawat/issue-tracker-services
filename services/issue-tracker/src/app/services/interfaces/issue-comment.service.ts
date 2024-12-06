import { ServiceResponse } from "@issue-tracker/common";
import { IssueCommentEntity } from "../../../data";

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
