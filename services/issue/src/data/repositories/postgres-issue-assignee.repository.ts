import { Typeorm } from "@issue-tracker/orm";
import { IssueAssigneeEntity } from "../entities";
import { IssueAssigneeRepository } from "./interfaces/issue-assignee.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresIssueAssigneeRepository
  implements IssueAssigneeRepository
{
  constructor(private orm: Typeorm) {}
  existsById(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  save = async (
    assignee: IssueAssigneeEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueAssigneeEntity)
      .values(assignee)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueAssigneeEntity;
  };

  findAssigneeByUserId = async (userId: string) => {
    return await IssueAssigneeEntity.findOne({ where: { userId } });
  };

  findByIssueId = async (issueId: string) => {
    return await IssueAssigneeEntity.find({ where: { issueId } });
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
