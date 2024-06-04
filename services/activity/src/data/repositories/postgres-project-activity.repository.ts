import { Typeorm } from "@issue-tracker/orm";
import { ProjectActivityRepository } from "./interfaces/project-activity.repository";
import { ProjectActivityEntity } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresProjectActivityRepository
  implements ProjectActivityRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    activity: ProjectActivityEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ProjectActivityEntity)
      .values(activity)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectActivityEntity;
  };

  existsById = async (id: string) => {
    return await ProjectActivityEntity.exists({ where: { id } });
  };

  findActivityByProjectId = async (projectId: string) => {
    return await ProjectActivityEntity.find({ where: { projectId } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
