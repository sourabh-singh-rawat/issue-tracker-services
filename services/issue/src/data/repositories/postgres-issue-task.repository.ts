import { Typeorm } from "@issue-tracker/orm";
import { IssueTaskEntity } from "../entities";
import { IssueTaskRepository } from "./interfaces/issue-task.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresIssueTaskRepository implements IssueTaskRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (task: IssueTaskEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueTaskEntity)
      .values(task)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueTaskEntity;
  };

  existsById = async (id: string) => {
    return await IssueTaskEntity.exists({ where: { id } });
  };

  find = async (issueId: string) => {
    return await IssueTaskEntity.find({ where: { issueId } });
  };

  update = async (
    id: string,
    updatedTask: IssueTaskEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(IssueTaskEntity)
      .set(updatedTask)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = () => {
    throw new Error("Method not implemented.");
  };
}
