import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { ProjectMemberRepository } from "./interfaces/project-member";
import { ProjectMemberEntity } from "../app/entities";

export class PostgresProjectMemberRepository
  implements ProjectMemberRepository
{
  constructor(private readonly store: TypeormStore) {}

  save = async (
    project: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.store
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(ProjectMemberEntity)
      .values(project)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectMemberEntity;
  };

  existsById = async (id: string) => {
    return await ProjectMemberEntity.exists({ where: { id } });
  };

  existsByProjectId = async (id: string, projectId: string) => {
    return await ProjectMemberEntity.exists({ where: { id, projectId } });
  };

  findByProjectId = async (projectId: string) => {
    return await ProjectMemberEntity.find({
      select: { user: { id: true, displayName: true, email: true } },
      where: { projectId },
      relations: { user: true },
    });
  };

  updateByUserId = async (
    userId: string,
    updatedProjectMember: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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
