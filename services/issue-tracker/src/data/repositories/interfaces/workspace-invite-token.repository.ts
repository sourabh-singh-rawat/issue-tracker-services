import { Repository } from "@issue-tracker/orm";
import { WorkspaceInvitation } from "../../entities/WorkspaceInvitation";

export interface WorkspaceInviteTokenRepository
  extends Repository<WorkspaceInvitation> {}
