import { EmailMessage, NodeMailer } from "@issue-tracker/comm";
import { UserNotFoundError } from "@issue-tracker/common";
import { ProjectMemberPayload } from "@issue-tracker/event-bus";
import { User } from "../data/entities";
import { ProjectEmailService } from "./interfaces/project-email.service";

export class CoreProjectEmailService implements ProjectEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(private readonly mailer: NodeMailer) {}

  sendProjectInvitationEmail = async (payload: ProjectMemberPayload) => {
    const { projectId, role, createdBy } = payload;

    const sender = await User.findOne({ where: { id: createdBy } });
    if (!sender) throw new UserNotFoundError();

    const message: EmailMessage = {
      title: `You are invited to join project by ${sender.displayName}`,
      html: `
        <strong>
          <p>You are invited to Project: ${projectId} by ${sender.displayName} for ${role} role</p>
        </strong>
        <a href="https://localhost/api/v1/projects/${projectId}/members/confirm?inviteToken=${"TODO: Token"}">
          Click to Accept Invite
        </a> 
      `,
    };
    this.mailer.send(this.senderEmail, "TODO: Email", message);
  };
}
