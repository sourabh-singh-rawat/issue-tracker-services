import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueAssigneeEntity } from "../app/entities";
import { IssueAssigneeRepository } from "./interfaces/issue-assignee.repository";

export class PostgresIssueAssigneeRepository
  implements IssueAssigneeRepository
{
  constructor(private store: TypeormStore) {}
  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  save = async (
    assignee: IssueAssigneeEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
