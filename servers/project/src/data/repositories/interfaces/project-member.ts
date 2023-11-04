import {
  ProjectMember,
  QueryBuilderOptions,
  Repository,
} from "@sourabhrawatcc/core-utils";
import { ProjectMemberEntity } from "../../entities";

export interface ProjectMemberRepository
  extends Repository<ProjectMemberEntity> {
  findByProjectId(projectId: string): Promise<ProjectMember[]>;
  updateByUserId(
    userId: string,
    updatedProjectMember: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
