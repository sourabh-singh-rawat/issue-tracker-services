import { QueryBuilderOptions, TypeormStore } from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../app/entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private store: TypeormStore) {}

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

  updateProject = async (
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

  softDelete(
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
