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
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(ProjectMemberEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectMemberEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    const result = await this.databaseService.query<{
      member_exists_by_id: boolean;
    }>("SELECT * FROM member_exists_by_id($1)", [id]);

    return result[0].member_exists_by_id;
  };

  find = async () => {};

  findByProjectId = async (projectId: string) => {
    const result = await this.databaseService.query<{
      id: string;
      name: string;
      email: string;
      memberUserId: string;
      createdAt: string;
      updatedAt: string;
    }>("SELECT * FROM find_members_by_project_id($1)", [projectId]);

    return result;
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
