import { Typeorm } from "@issue-tracker/orm";
import { ProjectActivityRepository } from "./interfaces/project-activity.repository";
import { ListItemActivity } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresProjectActivityRepository
  implements ProjectActivityRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (activity: ListItemActivity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ListItemActivity)
      .values(activity)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ListItemActivity;
  };

  existsById = async (id: string) => {
    return await ListItemActivity.exists({ where: { id } });
  };

  findActivityByProjectId = async (projectId: string) => {
    return await ListItemActivity.find({ where: { projectId } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
