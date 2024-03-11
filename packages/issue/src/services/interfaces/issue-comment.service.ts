import { ServiceResponse } from "@sourabhrawatcc/core-utils";
import { IssueCommentEntity } from "../../app/entities";

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
