import { QueryBuilderOptions, Repository } from "@sourabhrawatcc/core-utils";
import { ProjectMemberEntity } from "../../app/entities";

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
