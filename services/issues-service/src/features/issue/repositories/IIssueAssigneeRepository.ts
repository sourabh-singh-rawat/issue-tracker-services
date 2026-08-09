import type { DbClient, IssueAssignee } from "@/db";

export type IssueAssigneeRepositoryOptions = { tx?: DbClient };

export type CreateIssueAssigneeEntity = {
  id?: string;
  issueId: string;
  userId: string;
};

export interface IIssueAssigneeRepository {
  saveMany(
    entities: CreateIssueAssigneeEntity[],
    options?: IssueAssigneeRepositoryOptions,
  ): Promise<IssueAssignee[]>;
}
