import { ProjectMemberPayload } from "@issue-tracker/event-bus";

export interface ProjectEmailService {
  sendProjectInvitationEmail(payload: ProjectMemberPayload): Promise<void>;
}
