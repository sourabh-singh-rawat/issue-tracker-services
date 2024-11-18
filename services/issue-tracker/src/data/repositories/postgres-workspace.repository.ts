import { QueryBuilderOptions, Typeorm } from "@issue-tracker/orm";
import { Workspce } from "../entities/Workspace";
import { WorkspaceRepository } from "./interfaces/workspace.repository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private orm: Typeorm) {}

  save = async (workspace: Workspce, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(Workspce)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as Workspce;
  };

  existsById = async (id: string) => {
    return await Workspce.exists({ where: { id } });
  };

  findById = async (id: string) => {
    return await Workspce.findOne({ where: { id } });
  };

  findByUserId = async (userId: string) => {
    return await Workspce.find({ where: { ownerUserId: userId } });
  };

  find = async (userId: string) => {
    return await Workspce.find({ where: { ownerUserId: userId } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
