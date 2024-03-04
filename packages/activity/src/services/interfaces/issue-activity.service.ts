import { IssueCreatedPayload } from "@sourabhrawatcc/core-utils";

export interface IssueActivityService {
  logIssueCreated(payload: IssueCreatedPayload): Promise<void>;
}
