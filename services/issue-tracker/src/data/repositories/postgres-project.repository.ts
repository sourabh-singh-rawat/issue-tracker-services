import { Typeorm } from "@issue-tracker/orm";
import { List } from "../entities/List";
import { ProjectRepository } from "./interfaces/project.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { Filters } from "@issue-tracker/common";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (project: List, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(List)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as List;
  };

  existsById = async (id: string) => {
    return await List.exists({ where: { id } });
  };

  find = async (userId: string, workspaceId: string, filters: Filters) => {
    const { page, pageSize } = filters;

    const queryBuilder = this.orm.createQueryBuilder();
    const query = queryBuilder
      .select("*")
      .from(List, "p")
      .limit(page * pageSize);

    return (await query.execute()) as List[];
  };

  findCount = async () => {
    const queryBuilder = this.orm.createQueryBuilder();
    const query = queryBuilder.select("*").from(List, "p");

    return await query.getCount();
  };

  findOne = async (id: string) => {
    return await List.findOne({ where: { id } });
  };

  update = async (
    id: string,
    updatedProject: List,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(List)
      .set(updatedProject)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
