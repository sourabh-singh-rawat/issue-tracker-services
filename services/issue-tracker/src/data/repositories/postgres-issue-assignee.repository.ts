import { Typeorm } from "@issue-tracker/orm";
import { ItemAssignee } from "../entities";
import { IssueAssigneeRepository } from "./interfaces/issue-assignee.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresIssueAssigneeRepository
  implements IssueAssigneeRepository
{
  constructor(private orm: Typeorm) {}
  existsById(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  save = async (assignee: ItemAssignee, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ItemAssignee)
      .values(assignee)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ItemAssignee;
  };

  findAssigneeByUserId = async (userId: string) => {
    return await ItemAssignee.findOne({ where: { userId } });
  };

  findByIssueId = async (issueId: string) => {
    return await ItemAssignee.find({ where: { itemId: issueId } });
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
