import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { ProjectMemberEntity } from "../../entities";

export interface ProjectMemberRepository
  extends Repository<ProjectMemberEntity> {
  existsByProjectId(id: string, projectId: string): Promise<boolean>;
  findByProjectId(projectId: string): Promise<ProjectMemberEntity[]>;
  updateByUserId(
    userId: string,
    updatedProjectMember: ProjectMemberEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
