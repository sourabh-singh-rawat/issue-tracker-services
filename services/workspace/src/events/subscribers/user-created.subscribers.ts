import { JsMsg } from "nats";
import { WorkspaceService } from "../../services/interfaces/workspace.service";
import { UserEntity } from "../../data/entities";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { JwtToken } from "@issue-tracker/security";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerWorkspace;

  constructor(
    private eventBus: EventBus,
    private workspaceService: WorkspaceService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const {
      userId,
      defaultWorkspaceId,
      isEmailVerified,
      displayName,
      email,
      photoUrl,
      inviteToken,
    } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.defaultWorkspaceId = defaultWorkspaceId;
    newUser.email = email;
    newUser.isEmailVerified = isEmailVerified;
    newUser.displayName = displayName;
    newUser.photoUrl = photoUrl;

    if (inviteToken) {
      await this.workspaceService.createDefaultWorkspace(newUser);

      const token: WorkspaceInvitePayload = JwtToken.verify(
        inviteToken,
        process.env.JWT_SECRET!,
      );

      await this.workspaceService.createWorkspaceMember(
        userId,
        token.workspaceId,
        token.receiverRole,
      );
      message.ack();
      return console.log("Message processing completed");
    }

    await this.workspaceService.createDefaultWorkspace(newUser);
    message.ack();
    return console.log("Message processing completed");
  };
}
