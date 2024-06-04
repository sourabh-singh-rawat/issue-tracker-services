import { Typeorm } from "@issue-tracker/orm";
import { ProjectEntity } from "../entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private orm: Typeorm) {}

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

  updateProject = async (
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

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
