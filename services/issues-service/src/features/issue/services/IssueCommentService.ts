import { ServiceResponse } from "@pine/common";
import { IIssueCommentService } from "./IIssueCommentService";

export class IssueCommentService implements IIssueCommentService {
  constructor() {}

  createIssueComment = async (_userId: string, _issueId: string, _description: string) => {};

  getIssueCommentList = async (_issueId: string) => {
    return new ServiceResponse({ rows: [], filteredRowCount: 1 });
  };

  deleteIssueComment = async (_commentId: string) => {};
}
