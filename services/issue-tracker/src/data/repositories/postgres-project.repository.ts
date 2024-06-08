import { Typeorm } from "@issue-tracker/orm";
import { ProjectEntity } from "../entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { Filters } from "@issue-tracker/common";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (project: ProjectEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ProjectEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectEntity;
  };

  existsById = async (id: string) => {
    return await ProjectEntity.exists({ where: { id } });
  };

  find = async (userId: string, workspaceId: string, filters: Filters) => {
    const { page, pageSize } = filters;

    const queryBuilder = this.orm.createQueryBuilder();
    const query = queryBuilder
      .select("*")
      .from(ProjectEntity, "p")
      .limit(page * pageSize);

    return (await query.execute()) as ProjectEntity[];
  };

  findCount = async () => {
    const queryBuilder = this.orm.createQueryBuilder();
    const query = queryBuilder.select("*").from(ProjectEntity, "p");

    return await query.getCount();
  };

  findOne = async (id: string) => {
    return await ProjectEntity.findOne({ where: { id } });
  };

  update = async (
    id: string,
    updatedProject: ProjectEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(ProjectEntity)
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
