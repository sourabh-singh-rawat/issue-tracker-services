import {
  UserAlreadyExists,
  WORKSPACE_NAME,
  WORKSPACE_STATUS,
} from "@issue-tracker/common";
import {
  Broker,
  CONSUMERS,
  SUBJECTS,
  Streams,
  Subscriber,
  UserEmailVerifiedPayload,
} from "@issue-tracker/event-bus";
import { JsMsg } from "nats";
import { DataSource } from "typeorm";
import { User, Workspace } from "../data";

export class UserEmailVerifiedSubscriber extends Subscriber<UserEmailVerifiedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_VERIFIED_ISSUE_TRACKER;
  readonly subject = SUBJECTS.USER_EMAIL_VERIFIED;

  constructor(
    private readonly broker: Broker,
    private readonly dataSource: DataSource,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: UserEmailVerifiedPayload) {
    const { userId, email, emailVerificationStatus, displayName } = payload;

    await this.dataSource.transaction(async (manager) => {
      const UserRepo = manager.getRepository(User);
      const WorkspaceRepo = manager.getRepository(Workspace);

      const isAlreadyUser = await UserRepo.findOne({ where: { id: userId } });
      if (isAlreadyUser) throw new UserAlreadyExists();

      const newUser = await UserRepo.save({
        id: userId,
        email,
        emailVerificationStatus,
        displayName,
      });
      const newWorkspace = await WorkspaceRepo.save({
        name: WORKSPACE_NAME.DEFAULT,
        status: WORKSPACE_STATUS.DEFAULT,
        createdById: userId,
      });

      newUser.defaultWorkspaceId = newWorkspace.id;
      await UserRepo.save(newUser);

      /**
       * 
      if (inviteToken) {
        const token: WorkspaceInvitePayload = JwtToken.verify(
          inviteToken,
          process.env.JWT_SECRET!,
        );

        const newWorkspaceMember = new WorkspaceMember();
        newWorkspaceMember.userId = userId;
        newWorkspaceMember.workspaceId = token.workspaceId;
        // newWorkspaceMember.role
        newWorkspaceMember.email = email;
        newWorkspaceMember.status = WORKSPACE_MEMBER_STATUS.ACTIVE;

        await this.workspaceMemberRepository.save(newWorkspaceMember, {
          queryRunner,
        });

        return;
      }

      const newWorkspaceMember = new WorkspaceMember();
      newWorkspaceMember.userId = userId;
      newWorkspaceMember.workspaceId = savedWorkspace.id;
      newWorkspaceMember.role = WORKSPACE_MEMBER_ROLES.OWNER;
      newWorkspaceMember.status = WORKSPACE_MEMBER_STATUS.ACTIVE;
      newWorkspaceMember.email = email;

      await this.workspaceMemberRepository.save(newWorkspaceMember, {
        queryRunner,
      });
    
       */
    });

    message.ack();
  }
}
