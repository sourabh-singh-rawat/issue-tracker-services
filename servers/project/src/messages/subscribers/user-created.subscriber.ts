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
import { UserEntity } from "../../data/entities";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";
import { WorkspaceMemberRepository } from "../../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerProject;

  constructor(
    private readonly messenger: Messenger,
    private readonly userRepository: UserRepository,
    private readonly postgresTypeormStore: TypeormStore,
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

      const queryRunner = this.postgresTypeormStore.createQueryRunner();
      await this.postgresTypeormStore.transaction(
        queryRunner,
        async (queryRunner) => {
          await this.userRepository.save(newUser, { queryRunner });
          await this.workspaceMemberRepository.save(newWorkspaceMember, {
            queryRunner,
          });
        },
      );

      message.ack();
      return console.log("Message processing completed");
    }

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
