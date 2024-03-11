import { Repository } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../../app/entities/workspace-member.entity";
import { UserEntity } from "../../app/entities";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  find(
    projectId: string,
    workspaceId: string,
  ): Promise<WorkspaceMemberEntity[]>;
}
