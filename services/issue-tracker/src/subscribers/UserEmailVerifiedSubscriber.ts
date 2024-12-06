import {
  Broker,
  CONSUMERS,
  SUBJECTS,
  Streams,
  Subscriber,
  UserEmailVerifiedPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { JsMsg } from "nats";

export class UserEmailVerifiedSubscriber extends Subscriber<UserEmailVerifiedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_VERIFIED_ISSUE_TRACKER;
  readonly subject = SUBJECTS.USER_EMAIL_VERIFIED;

  constructor(
    private readonly broker: Broker,
    private readonly orm: Typeorm,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: UserEmailVerifiedPayload) => {
    const {
      userId,
      email,
      emailVerificationStatus,
      displayName,
      photoUrl,
      inviteToken,
    } = payload;

    const queryRunner = this.orm.createQueryRunner();
    await this.orm.transaction(queryRunner, async () => {
      /**
       * 
      const newUser = new User();
      newUser.id = userId;
      newUser.email = email;
      newUser.emailVerificationStatus = emailVerificationStatus;
      newUser.displayName = displayName;
      newUser.photoUrl = photoUrl;
      const savedUser = await this.userRepository.save(newUser, {
        queryRunner,
      });

      const newWorkspace = new Workspace();
      newWorkspace.createdById = savedUser.id;
      newWorkspace.name = WORKSPACE_NAME.DEFAULT;
      newWorkspace.status = WORKSPACE_STATUS.DEFAULT;

      const savedWorkspace = await this.workspaceRepository.save(newWorkspace, {
        queryRunner,
      });

      newUser.defaultWorkspaceId = savedWorkspace.id;

      await this.userRepository.updateUser(savedUser.id, newUser, {
        queryRunner,
      });

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
  };
}
