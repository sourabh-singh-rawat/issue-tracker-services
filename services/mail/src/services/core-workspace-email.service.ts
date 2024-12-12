import { EmailMessage, NodeMailer } from "@issue-tracker/comm";
import { EMAIL_TYPE, UserNotFoundError } from "@issue-tracker/common";
import { WorkspaceInvitePayload } from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { Email, User } from "../data/entities";
import { WorkspaceEmailService } from "./interfaces/workspace-email.service";

export class CoreWorkspaceEmailService implements WorkspaceEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";
  private readonly server = "http://localhost:4000";

  constructor(
    private readonly orm: Typeorm,
    private readonly mailer: NodeMailer,
  ) {}

  sendWorkspaceInvitationEmail = async (payload: WorkspaceInvitePayload) => {
    const {
      userId,
      token,
      email: receiverEmail,
      workspaceId,
      workspaceName,
    } = payload;

    const exists = await User.exists({ where: { id: userId } });
    if (!exists) throw new UserNotFoundError();

    const queryRunner = this.orm.createQueryRunner();
    await this.orm.transaction(queryRunner, async (queryRunner) => {
      const message: EmailMessage = {
        title: `You are invited to join workspace by ${userId}`,
        html: `
          <strong>
            <p>You are invited to Workspace: ${workspaceName} by ${userId}</p>
          </strong>
          <a href="${this.server}/api/v1/workspaces/${workspaceId}/invite/confirm?inviteToken=${token}">
            Click to Accept Invite
          </a>
        `,
      };

      const newEmail = new Email();
      newEmail.type = EMAIL_TYPE.WORKSPACE_INVITATION;
      newEmail.email = receiverEmail;

      await Email.save(newEmail);
      await this.mailer.send(this.senderEmail, receiverEmail, message);
    });
  };
}
