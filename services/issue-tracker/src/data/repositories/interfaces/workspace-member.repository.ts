import { Repository } from "@issue-tracker/orm";
import { WorkspaceMemberEntity } from "../../entities";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  find(workspaceId: string): Promise<WorkspaceMemberEntity[]>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUserId: (userId: string, workspaceId: string) => Promise<boolean>;
}
