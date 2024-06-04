import { QueryBuilderOptions } from "@issue-tracker/orm";
import { ProjectMemberRepository } from "./interfaces/project-member";
import { ProjectMemberEntity } from "../app/entities";
import { Typeorm } from "@issue-tracker/orm";

export class PostgresProjectMemberRepository
  implements ProjectMemberRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    project: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
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
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(ProjectMemberEntity)
      .set(updatedProjectMember)
      .where("userId = :userId", { userId });

    await query.execute();
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
