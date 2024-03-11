import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { ProjectActivityRepository } from "./interfaces/project-activity.repository";
import { ProjectActivityEntity } from "../app/entities";

export class PostgresProjectActivityRepository
  implements ProjectActivityRepository
{
  constructor(private readonly store: TypeormStore) {}

  save = async (
    activity: ProjectActivityEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
