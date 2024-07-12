import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities/user.entity";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";
import { WorkspaceMemberRepository } from "../../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";
import {
  CONSUMERS,
  EventBus,
  Streams,
  SUBJECTS,
  Subscriber,
  UserEmailVerifiedPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { JwtToken } from "@issue-tracker/security";
import { WorkspaceRepository } from "../../data/repositories/interfaces/workspace.repository";
import { WorkspaceEntity } from "../../data/entities/workspace.entity";
import {
  WORKSPACE_MEMBER_ROLES,
  WORKSPACE_MEMBER_STATUS,
  WORKSPACE_NAME,
  WORKSPACE_STATUS,
} from "@issue-tracker/common";

export class UserEmailVerifiedSubscriber extends Subscriber<UserEmailVerifiedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_VERIFIED_ISSUE_TRACKER;
  readonly subject = SUBJECTS.USER_EMAIL_VERIFIED;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
    private readonly orm: Typeorm,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(eventBus.client);
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
      const newUser = new UserEntity();
      newUser.id = userId;
      newUser.email = email;
      newUser.emailVerificationStatus = emailVerificationStatus;
      newUser.displayName = displayName;
      newUser.photoUrl = photoUrl;
      const savedUser = await this.userRepository.save(newUser, {
        queryRunner,
      });

      const newWorkspace = new WorkspaceEntity();
      newWorkspace.ownerUserId = savedUser.id;
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

        const newWorkspaceMember = new WorkspaceMemberEntity();
        newWorkspaceMember.userId = userId;
        newWorkspaceMember.workspaceId = token.workspaceId;

        await this.workspaceMemberRepository.save(newWorkspaceMember, {
          queryRunner,
        });

        return;
      }

      const newWorkspaceMember = new WorkspaceMemberEntity();
      newWorkspaceMember.userId = userId;
      newWorkspaceMember.workspaceId = savedWorkspace.id;
      newWorkspaceMember.role = WORKSPACE_MEMBER_ROLES.OWNER;
      newWorkspaceMember.status = WORKSPACE_MEMBER_STATUS.ACTIVE;

      await this.workspaceMemberRepository.save(newWorkspaceMember, {
        queryRunner,
      });
    });

    message.ack();
  };
}
