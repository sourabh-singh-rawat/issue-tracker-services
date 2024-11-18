import { Repository } from "@issue-tracker/orm";
import { WorkspaceMember } from "../../entities";

export interface WorkspaceMemberRepository extends Repository<WorkspaceMember> {
  find(workspaceId: string): Promise<WorkspaceMember[]>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUserId: (userId: string, workspaceId: string) => Promise<boolean>;
}
