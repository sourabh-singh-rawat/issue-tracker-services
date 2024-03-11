import {
  Consumers,
  TypeormStore,
  JwtToken,
  Messenger,
  Streams,
  Subscriber,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { UserEntity } from "../../app/entities";
import { UserRepository } from "../../repositories/interfaces/user.repository";
import { WorkspaceMemberRepository } from "../../repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../app/entities/workspace-member.entity";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerProject;

  constructor(
    private readonly messenger: Messenger,
    private readonly userRepository: UserRepository,
    private readonly store: TypeormStore,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const {
      userId,
      email,
      isEmailVerified,
      defaultWorkspaceId,
      displayName,
      photoUrl,
      inviteToken,
    } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.email = email;
    newUser.defaultWorkspaceId = defaultWorkspaceId;
    newUser.isEmailVerified = isEmailVerified;
    newUser.displayName = displayName;
    newUser.photoUrl = photoUrl;

    if (inviteToken) {
      let token: WorkspaceInvitePayload;
      try {
        token = JwtToken.verify(inviteToken, process.env.JWT_SECRET!);
      } catch (err) {
        throw err;
      }

      const newWorkspaceMember = new WorkspaceMemberEntity();
      newWorkspaceMember.userId = userId;
      newWorkspaceMember.workspaceId = token.workspaceId;

      const queryRunner = this.store.createQueryRunner();
      await this.store.transaction(queryRunner, async (queryRunner) => {
        await this.userRepository.save(newUser, { queryRunner });
        await this.workspaceMemberRepository.save(newWorkspaceMember, {
          queryRunner,
        });
      });

      message.ack();
      return console.log("Message processing completed");
    }

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
