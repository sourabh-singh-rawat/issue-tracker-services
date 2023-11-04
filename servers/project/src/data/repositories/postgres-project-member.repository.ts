import {
  TypeormStore,
  QueryBuilderOptions,
  ProjectMember,
} from "@sourabhrawatcc/core-utils";
import { ProjectMemberRepository } from "./interfaces/project-member";
import { ProjectMemberEntity } from "../entities";

export class PostgresProjectMemberRepository
  implements ProjectMemberRepository
{
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = async (
    project: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.postgresTypeormStore
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(ProjectMemberEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectMemberEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    const result = await this.postgresTypeormStore.query<{
      memberExistsById: boolean;
    }>("SELECT * FROM member_exists_by_id($1)", [id]);

    return result[0].memberExistsById;
  };

  findByProjectId = async (projectId: string) => {
    const result = await this.postgresTypeormStore.query<ProjectMember>(
      "SELECT * FROM find_members_by_project_id($1)",
      [projectId],
    );

    return result;
  };

  updateByUserId = async (
    userId: string,
    updatedProjectMember: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .update(ProjectMemberEntity)
      .set(updatedProjectMember)
      .where("userId = :userId", { userId });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
