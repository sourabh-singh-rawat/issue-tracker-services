import { IssueCreatedData } from "@pine/events";

export interface IIssueActivityService {
  logCreatedIssue(payload: IssueCreatedData): Promise<void>;
}
