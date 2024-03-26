import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../app/entities";
import { IssueRepository } from "./interfaces/issue.repository";
import { IsNull, Not } from "typeorm";

export class PostgresIssueRepository implements IssueRepository {
  constructor(private store: TypeormStore) {}

  save = async (issue: IssueEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueEntity)
      .values(issue)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueEntity;
  };

  existsById = async (id: string) => {
    return await IssueEntity.exists({ where: { id } });
  };

  find = async (userId: string) => {
    return await IssueEntity.find({
      select: {
        reporter: { id: true, displayName: true },
        project: { id: true, name: true },
        assignees: { id: true, user: { id: true, displayName: true } },
      },
      where: { createdById: userId },
      relations: { reporter: true, project: true, assignees: { user: true } },
    });
  };

  findOne = async (id: string) => {
    return await IssueEntity.findOne({
      select: {
        assignees: { id: true, user: { id: true, displayName: true } },
        project: { id: true, name: true },
        reporter: { id: true, displayName: true },
      },
      where: { id },
      relations: { assignees: true, project: true, reporter: true },
    });
  };

  isIssueArchived = async (id: string) => {
    return await IssueEntity.exists({
      where: { id, deletedAt: Not(IsNull()) },
    });
  };

  update = async (
    id: string,
    updatedIssue: IssueEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .update(IssueEntity)
      .set(updatedIssue)
      .where("id = :id AND deletedAt IS NULL", { id });

    await query.execute();
  };

  updateResolution = async (
    id: string,
    updatedIssue: IssueEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .update(IssueEntity)
      .set(updatedIssue)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .softDelete()
      .from(IssueEntity)
      .where("id = :id", { id });

    await query.execute();
  };

  restoreDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .restore()
      .from(IssueEntity)
      .where("id = :id", { id });

    await query.execute();
  };
}
