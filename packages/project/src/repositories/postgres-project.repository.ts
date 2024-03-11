import {
  TypeormStore,
  Filters,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../app/entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private readonly store: TypeormStore) {}

  save = async (project: ProjectEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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
    const { page, pageSize, sortBy, sortOrder, status } = filters;

    const queryBuilder = this.store.createQueryBuilder();
    const query = queryBuilder
      .select("*")
      .from(ProjectEntity, "p")
      .limit(page * pageSize);

    return (await query.execute()) as ProjectEntity[];
  };

  findCount = async (userId: string, workspaceId: string) => {
    const queryBuilder = this.store.createQueryBuilder();
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
    const query = this.store
      .createQueryBuilder(queryRunner)
      .update(ProjectEntity)
      .set(updatedProject)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.store
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
