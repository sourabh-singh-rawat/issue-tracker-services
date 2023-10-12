import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { ProjectMemberRepository } from "./interfaces/project-member";
import { ProjectMemberEntity } from "../entities";

export class PostgresProjectMemberRepository
  implements ProjectMemberRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (
    project: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.databaseService
      .createQueryBuilder(ProjectMemberEntity, "wm", options?.queryRunner)
      .insert()
      .into(ProjectMemberEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectMemberEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    throw new Error("Method not implemented.");
  };

  find = async () => {};

  findByProjectId = async (projectId: string) => {
    const result = await this.databaseService.query<ProjectMemberEntity>(
      "SELECT * FROM find_members_by_project_id($1)",
      [projectId],
    );

    return result;
  };

  softDelete = async (
    id: string,
    options?: QueryBuilderOptions | undefined,
  ) => {
    throw new Error("Method not implemented.");
  };
}
