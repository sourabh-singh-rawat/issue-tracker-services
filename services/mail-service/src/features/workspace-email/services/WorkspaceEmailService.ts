import { EmailMessage, Mailer } from "@pine/comm";
import { EMAIL_TYPE, UserNotFoundError } from "@pine/common";
import { WorkspaceInvitePayload } from "@pine/event-bus";
import { Typeorm } from "@pine/orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { Email, User } from "@/entities";
import { IWorkspaceEmailService } from "./IWorkspaceEmailService";

@injectable()
export class WorkspaceEmailService implements IWorkspaceEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";
  private readonly server = "http://localhost:4000";

  constructor(
    @inject(TYPES.Orm)
    private readonly orm: Typeorm,
    @inject(TYPES.Mailer)
    private readonly mailer: Mailer,
  ) {}

  sendWorkspaceInvitationEmail = async (payload: WorkspaceInvitePayload) => {
    const { userId, token, email: receiverEmail, workspaceId, workspaceName } = payload;

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
