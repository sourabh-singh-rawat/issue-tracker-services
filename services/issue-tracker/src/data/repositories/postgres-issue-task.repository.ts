import { Typeorm } from "@issue-tracker/orm";
import { CheckListItem } from "../entities";
import { IssueTaskRepository } from "./interfaces/issue-task.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresIssueTaskRepository implements IssueTaskRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (task: CheckListItem, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(CheckListItem)
      .values(task)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as CheckListItem;
  };

  existsById = async (id: string) => {
    return await CheckListItem.exists({ where: { id } });
  };

  find = async (issueId: string) => {
    return await CheckListItem.find({ where: { issueId } });
  };

  update = async (
    id: string,
    updatedTask: CheckListItem,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(CheckListItem)
      .set(updatedTask)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = () => {
    throw new Error("Method not implemented.");
  };
}
