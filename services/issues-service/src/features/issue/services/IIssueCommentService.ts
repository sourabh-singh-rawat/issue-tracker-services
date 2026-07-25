import { ServiceResponse } from "@pine/common";
import { IssueComment } from "@/entities/IssueComment";

export interface IIssueCommentService {
  createIssueComment(userId: string, issueId: string, description: string): Promise<void>;

  getIssueCommentList(issueId: string): Promise<ServiceResponse<IssueComment[]>>;

  deleteIssueComment(issueId: string): Promise<void>;
}
