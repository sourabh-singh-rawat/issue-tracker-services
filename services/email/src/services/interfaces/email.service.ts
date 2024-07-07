import {
  ProjectMemberPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { UserEmailConfirmationEntity } from "../../data/entities/user-email-confirmation.entity";

export interface EmailService {
  createInviteToken(payload: WorkspaceInvitePayload): string;
  sendUserEmailConfirmation(
    userEmailConfirmation: UserEmailConfirmationEntity,
  ): Promise<void>;
  sendWorkspaceInvitation(payload: WorkspaceInvitePayload): Promise<void>;
  sendProjectInvitation(payload: ProjectMemberPayload): Promise<void>;
}
