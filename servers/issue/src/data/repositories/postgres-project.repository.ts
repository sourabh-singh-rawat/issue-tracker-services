import { QueryBuilderOptions, TypeormStore } from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private postgresTypeormStore: TypeormStore) {}
  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  save = async (project: ProjectEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ProjectEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectEntity;
  };

  updateProject = async (
    id: string,
    updatedProject: ProjectEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
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
