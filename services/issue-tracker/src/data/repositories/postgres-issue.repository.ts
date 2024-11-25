import { Typeorm } from "@issue-tracker/orm";
import { Item } from "../entities";
import { IssueRepository } from "./interfaces/issue.repository";
import { IsNull, Not } from "typeorm";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresIssueRepository implements IssueRepository {
  constructor(private orm: Typeorm) {}

  save = async (issue: Item, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(Item)
      .values(issue)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as Item;
  };

  existsById = async (id: string) => {
    return await Item.exists({ where: { id } });
  };

  find = async (userId: string) => {
    return await Item.find({
      select: {
        list: { id: true, name: true },
        assignees: { id: true, user: { id: true, displayName: true } },
      },
      where: { createdById: userId },
      relations: { list: true, assignees: { user: true } },
    });
  };

  findOne = async (id: string) => {
    return await Item.findOne({
      select: {
        assignees: { id: true, user: { id: true, displayName: true } },
        list: { id: true, name: true },
      },
      where: { id },
      relations: { assignees: true, list: true },
    });
  };

  isIssueArchived = async (id: string) => {
    return await Item.exists({
      where: { id, deletedAt: Not(IsNull()) },
    });
  };

  update = async (
    id: string,
    updatedIssue: Item,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(Item)
      .set(updatedIssue)
      .where("id = :id AND deletedAt IS NULL", { id });

    await query.execute();
  };

  updateResolution = async (
    id: string,
    updatedIssue: Item,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(Item)
      .set(updatedIssue)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .softDelete()
      .from(Item)
      .where("id = :id", { id });

    await query.execute();
  };

  restoreDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .restore()
      .from(Item)
      .where("id = :id", { id });

    await query.execute();
  };
}
