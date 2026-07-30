import { uuidv7 } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type IssueAssignee, IssueAssignees } from "@/db";
import type {
  CreateIssueAssigneeEntity,
  IIssueAssigneeRepository,
  IssueAssigneeRepositoryOptions,
} from "@/features/issue/repositories/IIssueAssigneeRepository";

@injectable()
export class IssueAssigneeRepository implements IIssueAssigneeRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: IssueAssigneeRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async saveMany(
    entities: CreateIssueAssigneeEntity[],
    options?: IssueAssigneeRepositoryOptions,
  ): Promise<IssueAssignee[]> {
    if (entities.length === 0) return [];

    const client = this.client(options);
    const now = new Date();

    return client
      .insert(IssueAssignees)
      .values(
        entities.map((entity) => ({
          id: entity.id ?? uuidv7(),
          issueId: entity.issueId,
          userId: entity.userId,
          createdAt: now,
          version: 1,
        })),
      )
      .returning();
  }
}
