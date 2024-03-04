import {
  Filters,
  Repository,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../../entities/project.entity";

export interface ProjectRepository extends Repository<ProjectEntity> {
  find(
    userId: string,
    workspaceId: string,
    filters: Filters,
  ): Promise<ProjectEntity[]>;
  findOne(id: string): Promise<ProjectEntity>;
  findCount(userId: string, workspaceId: string): Promise<number>;
  update(
    id: string,
    updatedProject: ProjectEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
