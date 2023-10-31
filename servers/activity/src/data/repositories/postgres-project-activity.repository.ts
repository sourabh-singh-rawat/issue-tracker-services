import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { ProjectActivityEntity } from "../entities";
import { ProjectActivityRepository } from "./interfaces/project-activity.repository";

export class PostgresProjectActivityRepository
  implements ProjectActivityRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (
    activity: ProjectActivityEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ProjectActivityEntity)
      .values(activity)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ProjectActivityEntity;
  };

  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  findActivityByProjectId = async (id: string) => {
    const result = await this.databaseService.query<ProjectActivityEntity>(
      "SELECT * FROM find_project_activity_by_project_id($1)",
      [id],
    );

    return result as ProjectActivityEntity[];
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
