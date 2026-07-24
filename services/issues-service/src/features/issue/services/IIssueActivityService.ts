import { IssueCreatedPayload } from "@pine/event-bus";

export interface IIssueActivityService {
  logCreatedIssue(payload: IssueCreatedPayload): Promise<void>;
}
