import { Repository } from "@issue-tracker/orm";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  existsByUserId(userId: string, workspaceId: string): Promise<boolean>;
  find(id: string): Promise<WorkspaceMemberEntity[]>;
}
