import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities/user.entity";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";
import { WorkspaceMemberRepository } from "../../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { JwtToken } from "@issue-tracker/security";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerProject;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
    private readonly orm: Typeorm,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(eventBus.client);
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
      const token: WorkspaceInvitePayload = JwtToken.verify(
        inviteToken,
        process.env.JWT_SECRET!,
      );

      const newWorkspaceMember = new WorkspaceMemberEntity();
      newWorkspaceMember.userId = userId;
      newWorkspaceMember.workspaceId = token.workspaceId;

      // await this.userRepository.save(newUser);
      // await this.workspaceMemberRepository.save(newWorkspaceMember);
      message.ack();

      return console.log("Message processing completed");
    }

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
