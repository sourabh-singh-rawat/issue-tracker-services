import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";
import { RegisteredServices } from "../../app/service-container";

export class PostgresProjectRepository implements ProjectRepository {
  private readonly databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
  }

  save = async (project: ProjectEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(ProjectEntity, "p", queryRunner)
      .insert()
      .into(ProjectEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectEntity;
  };

  existsById = async (id: string) => {
    const result = await this.databaseService.query<{
      project_exists_by_id: boolean;
    }>("SELECT * FROM project_exists_by_id($1)", [id]); // TODO

    return result[0].project_exists_by_id;
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(ProjectEntity, "p", queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
