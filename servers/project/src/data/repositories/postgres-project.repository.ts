import {
  DatabaseService,
  Filters,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../entities/project.entity";
import { ProjectRepository } from "./interfaces/project.repository";

export class PostgresProjectRepository implements ProjectRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (project: ProjectEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ProjectEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectEntity;
  };

  existsById = async (id: string) => {
    const result = await this.databaseService.query<{
      projectExistsById: boolean;
    }>("SELECT * FROM project_exists_by_id($1)", [id]);

    return result[0].projectExistsById;
  };

  find = async (userId: string, workspaceId: string, filters: Filters) => {
    const { page, pageSize, sortBy, sortOrder } = filters;
    const result = await this.databaseService.query<ProjectEntity>(
      "SELECT * FROM find_projects_by_user_id_and_workspace_id($1, $2, $3, $4, $5, $6)",
      [userId, workspaceId, sortBy, sortOrder, pageSize, page * pageSize],
    );

    return result;
  };

  findCount = async (userId: string, workspaceId: string) => {
    const result = await this.databaseService.query<{ count: number }>(
      "SELECT * FROM find_projects_by_user_id_and_workspace_id_count($1, $2)",
      [userId, workspaceId],
    );

    return result[0].count as number;
  };

  findOne = async (id: string) => {
    const result = await this.databaseService.query<ProjectEntity>(
      "SELECT * FROM find_project_by_id($1)",
      [id],
    );

    return result[0] as ProjectEntity;
  };

  update = async (
    id: string,
    updatedProject: ProjectEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .update(ProjectEntity)
      .set(updatedProject)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
