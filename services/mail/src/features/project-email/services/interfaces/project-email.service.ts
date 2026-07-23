import { ProjectMemberPayload } from "@pine/event-bus";

export interface ProjectEmailService {
  sendProjectInvitationEmail(payload: ProjectMemberPayload): Promise<void>;
}
