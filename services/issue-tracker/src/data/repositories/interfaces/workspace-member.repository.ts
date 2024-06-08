import { Repository } from "@issue-tracker/orm";
import { WorkspaceMemberEntity } from "../../app/entities/workspace-member.entity";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  find(
    projectId: string,
    workspaceId: string,
  ): Promise<WorkspaceMemberEntity[]>;
}
