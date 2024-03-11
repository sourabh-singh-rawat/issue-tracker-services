import { IssueCreatedPayload } from "@sourabhrawatcc/core-utils";

export interface IssueActivityService {
  logCreatedIssue(payload: IssueCreatedPayload): Promise<void>;
}
